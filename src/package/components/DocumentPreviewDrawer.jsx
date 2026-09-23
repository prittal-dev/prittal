import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, Send, Check, Loader2, Mail, MapPin, CheckCircle, FileText, 
  Printer, Download, ExternalLink, ArrowLeft, Sparkles, Building2,
  Phone, User, CreditCard, ShieldCheck, HelpCircle, Layers, CheckCircle2,
  ChevronDown, ChevronUp, Sliders, AlertCircle, MessageCircle, Tag, ClipboardCheck,
  Search, RefreshCw, TrendingUp, ShoppingBag, Plus, Trash2, Edit3, CheckSquare, Palette,
  Circle, UserPlus, Package, Wrench, ZoomIn, ZoomOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { A_LA_CARTE_SERVICES } from './ALaCarteDrawer';
import { CustomBuilderDrawer } from './CustomBuilderDrawer';
import { 
  AGENCY_DETAILS, 
  SERVICE_COLUMNS, 
  TERMS_AND_CONDITIONS, 
  formatINR, 
  generateDocCode, 
  isServiceIncluded, 
  getInitialCheckedServices,
  getActiveCategoriesWithServices,
  getPlanFeaturesList,
  getAdditionalServicesList,
  getParseableAdditionalServicesList,
  getDeliverablesSummary,
  buildInvoiceEmailText 
} from '../utils/proformaUtils';
import { packagesData } from '../data/packagesData';
import logoBlack from '../../../assets/Prittal_logo_blac.png';
import '../styles/index.css';
import { syncPackageOrderToCrm, fetchCrmClients } from '../../utils/crmApi';

const MASTER_SERVICES_LIST = [
  'Website Design & Development',
  'E-Commerce Website Development',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing & Management',
  'Meta Ads (Facebook & Instagram)',
  'Google Search & Display Ads (PPC)',
  'Google My Business / Maps Optimization',
  'Corporate Shoot & Product Photography',
  'Logo Design & Brand Identity',
  'Creative Content & Copywriting',
  'Influencer Marketing Campaign',
  'Marketplace Management'
];

export const DocumentPreviewDrawer = ({
  isOpen = true,
  onClose,
  initialPackage,
  onNavigate,
  deal,
  client,
  docType = 'PI_PRODUCTION',
  payment: propPayment,
}) => {
  const { isDark } = useTheme();
  const printRef = useRef(null);

  const dealCode = deal?.dealCode || deal?.sourceDealId;
  const initialDocCode = dealCode ? (docType === 'TAX_INVOICE' ? `INV-${dealCode}` : `PI-PROD-${dealCode}`) : generateDocCode();
  const [docCode, setDocCode] = useState(() => initialDocCode);

  // Active View Mode: 'form' (Client & Billing Details) | 'preview' (Official 2-Page Proforma Invoice)
  const [activeView, setActiveView] = useState(() => deal ? 'preview' : 'form');
  const [includeTerms, setIncludeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlanSelectorOpen, setIsPlanSelectorOpen] = useState(false);

  // Default fallback package if opened without selection
  const defaultPkg = useMemo(() => ({
    categoryId: 'websites',
    categoryTitle: 'WEBSITE',
    categorySubtitle: 'Static · Dynamic · Customized · E-Commerce',
    tierId: 'standard',
    tierName: 'STANDARD',
    billingCycle: 'one-time',
    priceText: '₹50,000',
    isCustom: false
  }), []);

  // Selected Plan state
  const [selectedPkg, setSelectedPkg] = useState(() => {
    if (initialPackage) return initialPackage;
    if (deal) {
      return {
        categoryId: (deal?.category || deal?.planSnapshot?.category || 'websites').toLowerCase().replace(/\s+/g, '-'),
        categoryTitle: deal?.planSnapshot?.category ? deal.planSnapshot.category.toUpperCase() : (deal?.category ? deal.category.toUpperCase() : 'WEBSITE'),
        categorySubtitle: deal?.subtitle || 'Digital Retainer',
        tierId: (deal?.planSnapshot?.tier || deal?.planSnapshot?.name || deal?.title || 'standard').toLowerCase(),
        tierName: (deal?.planSnapshot?.tier || deal?.planSnapshot?.name || deal?.title || 'STANDARD').toUpperCase(),
        billingCycle: deal?.billingCycle || deal?.planSnapshot?.billingCycle || 'one-time',
        priceText: deal?.total ? `₹${formatINR(deal.total)}` : '₹50,000',
        isCustom: false,
        userBudget: deal?.subtotal || (deal?.total ? Math.round(Number(deal.total) / 1.18) : 50000),
        activeDetails: deal?.planSnapshot?.features || deal?.planSnapshot?.includes || [],
      };
    }
    return defaultPkg;
  });

  // Checked Services State (maps each bullet name -> boolean)
  const [checkedServices, setCheckedServices] = useState(() => 
    getInitialCheckedServices(selectedPkg)
  );

  // Selected Optional Add-ons
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Responsive Scale for Mobile PI View (Scale-to-fit desktop look)
  const [zoomMode, setZoomMode] = useState('fit'); // 'fit' | 'original' | 'custom'
  const [manualScale, setManualScale] = useState(null);
  const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 800);
  const [docHeight, setDocHeight] = useState(0);
  const previewContainerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (previewContainerRef.current) {
        setContainerWidth(previewContainerRef.current.clientWidth || window.innerWidth);
      } else {
        setContainerWidth(window.innerWidth);
      }
      if (printRef.current) {
        setDocHeight(printRef.current.offsetHeight);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timer = setTimeout(updateDimensions, 150);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [activeView, includeTerms, selectedPkg]);

  // Always default to fit screen zoom mode whenever opening preview
  useEffect(() => {
    if (activeView === 'preview') {
      setZoomMode('fit');
      setManualScale(null);
    }
  }, [activeView]);

  // Calculate effective auto-scale to fit available width perfectly with comfortable mobile margins
  const autoScale = useMemo(() => {
    if (containerWidth >= 840) return 1;
    const availableWidth = Math.max(260, (containerWidth || (typeof window !== 'undefined' ? window.innerWidth : 380)) - 32);
    return Math.min(1, Math.max(0.25, Number((availableWidth / 800).toFixed(3))));
  }, [containerWidth]);

  const currentScale = zoomMode === 'original' ? 1 : (manualScale !== null ? manualScale : autoScale);

  // Regenerate docCode and synchronize package when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomMode('fit');
      setManualScale(null);
      if (dealCode) {
        setDocCode(docType === 'TAX_INVOICE' ? `INV-${dealCode}` : `PI-PROD-${dealCode}`);
      } else {
        setDocCode(generateDocCode());
      }
      setActiveView(deal ? 'preview' : 'form');
      setSubmitted(false);

      const resolvedClient = client || deal?.client || {};
      const company = resolvedClient?.companyName || resolvedClient?.company || resolvedClient?.name || deal?.clientName || '';
      const contactName = resolvedClient?.name || resolvedClient?.contacts?.[0]?.name || deal?.clientName || '';
      const contactDesig = resolvedClient?.contacts?.[0]?.designation || '';
      const email = resolvedClient?.email || resolvedClient?.contacts?.[0]?.email || deal?.clientEmail || '';
      const phone = resolvedClient?.phone || resolvedClient?.mobile || deal?.clientPhone || '';
      const addr = resolvedClient?.billingAddress?.street || resolvedClient?.address || deal?.clientAddress || '';
      const city = resolvedClient?.billingAddress?.city || resolvedClient?.city || 'Delhi';
      const state = resolvedClient?.billingAddress?.state || resolvedClient?.state || 'Delhi';
      const pin = resolvedClient?.billingAddress?.postalCode || resolvedClient?.postalCode || deal?.clientPinCode || '';
      const gstin = resolvedClient?.gstin || deal?.clientGstin || '';
      const remark = deal?.notes || deal?.remark || deal?.specialTerms || '';
      const rec = Number(deal?.paidAmount !== undefined ? deal.paidAmount : (propPayment?.amount || 0));
      const tot = Number(deal?.total || 0);

      let pkg = initialPackage;
      if (!pkg && deal) {
        pkg = {
          categoryId: (deal?.category || deal?.planSnapshot?.category || 'websites').toLowerCase().replace(/\s+/g, '-'),
          categoryTitle: deal?.planSnapshot?.category ? deal.planSnapshot.category.toUpperCase() : (deal?.category ? deal.category.toUpperCase() : 'WEBSITE'),
          categorySubtitle: deal?.subtitle || 'Digital Retainer',
          tierId: (deal?.planSnapshot?.tier || deal?.planSnapshot?.name || deal?.title || 'standard').toLowerCase(),
          tierName: (deal?.planSnapshot?.tier || deal?.planSnapshot?.name || deal?.title || 'STANDARD').toUpperCase(),
          billingCycle: deal?.billingCycle || deal?.planSnapshot?.billingCycle || 'one-time',
          priceText: deal?.total ? `₹${formatINR(deal.total)}` : '₹50,000',
          isCustom: false,
          userBudget: deal?.subtotal || (deal?.total ? Math.round(Number(deal.total) / 1.18) : 50000),
          activeDetails: deal?.planSnapshot?.features || deal?.planSnapshot?.includes || [],
        };
      }
      if (!pkg) pkg = defaultPkg;
      
      const catId = (pkg.categoryId || '').toLowerCase();
      const isOneTime = catId === 'websites' || catId === 'product-shoots' || catId === 'product_shoot' || catId === 'google-my-business' || catId === 'google_my_business' || catId === 'branding-packages' || catId === 'branding';
      if (isOneTime && pkg.billingCycle !== 'one-time') {
        pkg = { ...pkg, billingCycle: 'one-time' };
      }

      setSelectedPkg(pkg);
      setCheckedServices(getInitialCheckedServices(pkg));
      setSelectedAddons([]);

      if (deal || client) {
        setFormData({
          companyName: company,
          name: contactName,
          designation: contactDesig,
          email,
          phone,
          address: addr,
          city,
          state,
          pinCode: pin,
          gstin,
          tanNo: '',
          paymentMode: propPayment?.paymentMode || deal?.paymentTerms || deal?.paymentMode || 'NEFT/RTGS',
          paymentStatus: deal?.paymentStatus || (rec >= tot && tot > 0 ? 'Full Payment Received' : rec > 0 ? 'Partial Received' : 'Full Payment Pending'),
          receivedAmount: rec > 0 ? String(rec) : '',
          discountAmount: deal?.discountAmount ? String(deal.discountAmount) : (deal?.discountValue ? String(deal.discountValue) : ''),
          gstRate: deal?.gstRate !== undefined ? Number(deal.gstRate) : 18,
          clientRemark: remark || pkg.clientRemark || pkg.notes || '',
          notes: remark || pkg.notes || pkg.clientRemark || '',
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          paymentMode: 'NEFT/RTGS',
          clientRemark: pkg.clientRemark || pkg.notes || '',
          notes: pkg.notes || pkg.clientRemark || '',
          gstRate: pkg.gstRate !== undefined ? pkg.gstRate : 18
        }));
      }
    }
  }, [isOpen, initialPackage, deal, client, propPayment, defaultPkg]);

  // Handle interactively toggling any service in the 6 columns
  const handleToggleService = (bullet) => {
    setCheckedServices((prev) => ({
      ...prev,
      [bullet]: !prev[bullet],
    }));
  };

  // Helper to switch plan/tier directly
  const handleSwitchPackage = (category, tier, billingCycle = 'monthly') => {
    const catId = (category.id || '').toLowerCase();
    const tId = (tier.id || '').toLowerCase();

    const isOneTime = catId === 'websites' || catId === 'product-shoots' || catId === 'product_shoot' || catId === 'google-my-business' || catId === 'google_my_business' || catId === 'branding-packages' || catId === 'branding';
    const cycle = isOneTime ? 'one-time' : billingCycle;
    
    // Monthly prices map (Indian Standard Numbering)
    const monthlyPrices = {
      websites: { basic: '₹25,000', standard: '₹50,000', premium: '₹1,00,000' },
      seo: { starter: '₹15,000', standard: '₹30,000', business: '₹50,000' },
      'paid-campaigns': { 'pc-starter': '₹10,000', 'pc-standard': '₹25,000', 'pc-business': '₹1,00,000' },
      paid_campaigns: { 'pc-starter': '₹10,000', 'pc-standard': '₹25,000', 'pc-business': '₹1,00,000' },
      'social-media': { basic: '₹20,000', standard: '₹40,000', premium: '₹50,000' },
      social_media: { basic: '₹20,000', standard: '₹40,000', premium: '₹50,000' },
      'product-shoots': { basic: '₹10,000', standard: '₹20,000', premium: '₹50,000' },
      product_shoot: { basic: '₹10,000', standard: '₹20,000', premium: '₹50,000' },
      'google-my-business': { starter: '₹10,000', business: '₹25,000' },
      google_my_business: { starter: '₹10,000', business: '₹25,000' },
      'branding-packages': { basic: '₹25,000', standard: '₹50,000', premium: '₹1,00,000' },
      branding: { basic: '₹25,000', standard: '₹50,000', premium: '₹1,00,000' }
    };

    // Annual prices map
    const annualPrices = {
      seo: { starter: '₹1,50,000', standard: '₹3,00,000', business: '₹5,00,000' },
      'social-media': { basic: '₹1,80,000', standard: '₹3,20,000', premium: '₹4,99,000' },
      social_media: { basic: '₹1,80,000', standard: '₹3,20,000', premium: '₹4,99,000' },
      'paid-campaigns': { 'pc-starter': '₹1,00,000', 'pc-standard': '₹2,50,000', 'pc-business': '₹10,00,000' },
      paid_campaigns: { 'pc-starter': '₹1,00,000', 'pc-standard': '₹2,50,000', 'pc-business': '₹10,00,000' }
    };

    let priceStr = '₹25,000';

    if (isOneTime) {
      const catPrices = monthlyPrices[catId] || {};
      priceStr = catPrices[tId] || '₹25,000';
    } else if (cycle === 'annual') {
      const catAnnual = annualPrices[catId] || {};
      priceStr = catAnnual[tId] || '₹1,50,000';
    } else {
      const catPrices = monthlyPrices[catId] || {};
      priceStr = catPrices[tId] || '₹25,000';
    }

    const newPkg = {
      categoryId: category.id,
      categoryTitle: category.title,
      categorySubtitle: category.subtitle,
      tierId: tier.id,
      tierName: tier.name,
      billingCycle: cycle,
      priceText: priceStr,
      isCustom: false,
    };

    setSelectedPkg(newPkg);
    setCheckedServices(getInitialCheckedServices(newPkg));
    setSelectedAddons([]);
  };

  const handleToggleModalBillingCycle = (newCycle) => {
    if (!selectedPkg || selectedPkg.billingCycle === newCycle) return;
    const cat = packagesData.find(c => c.id === selectedPkg.categoryId || c.title === selectedPkg.categoryTitle) || packagesData[0];
    const tier = (cat.tiers || []).find(t => t.id === selectedPkg.tierId || t.name === selectedPkg.tierName) || { id: selectedPkg.tierId || 'standard', name: selectedPkg.tierName || 'STANDARD' };
    handleSwitchPackage(cat, tier, newCycle);
  };

  // List of active services currently sold
  const activeSoldServices = useMemo(() => {
    if (selectedPkg?.selectedALaCarteItems && selectedPkg.selectedALaCarteItems.length > 0) {
      return selectedPkg.selectedALaCarteItems.map(item => typeof item === 'string' ? item : item.name);
    }
    if (selectedPkg?.activeDetails && selectedPkg.activeDetails.length > 0) {
      return selectedPkg.activeDetails;
    }
    return Object.entries(checkedServices)
      .filter(([_, isChecked]) => isChecked)
      .map(([name]) => name);
  }, [checkedServices, selectedPkg]);

  // Only categories that have at least one active checked service
  const activeCategoriesWithServices = useMemo(() => {
    return getActiveCategoriesWithServices(checkedServices);
  }, [checkedServices]);

  // List of all individual service inclusions/deliverables written on this plan
  const planFeaturesList = useMemo(() => {
    if (selectedPkg?.selectedALaCarteItems && selectedPkg.selectedALaCarteItems.length > 0) {
      return selectedPkg.selectedALaCarteItems.map(item => typeof item === 'string' ? item : item.name);
    }
    if (selectedPkg?.activeDetails && selectedPkg.activeDetails.length > 0) {
      return selectedPkg.activeDetails;
    }
    return getPlanFeaturesList(selectedPkg, packagesData);
  }, [selectedPkg]);

  // Check if planFeaturesList is duplicate of activeSoldServices to avoid repeating 30 services
  const isFeaturesDuplicate = useMemo(() => {
    if (!planFeaturesList || planFeaturesList.length === 0) return true;
    if (activeSoldServices.length === 0) return false;
    const activeSet = new Set(activeSoldServices.map(s => s.toLowerCase().trim()));
    const matchCount = planFeaturesList.filter(f => activeSet.has(f.toLowerCase().trim())).length;
    return matchCount >= Math.min(planFeaturesList.length, 3);
  }, [planFeaturesList, activeSoldServices]);

  // List of optional additional services available for this plan
  const parseableAddons = useMemo(() => {
    return getParseableAdditionalServicesList(selectedPkg, packagesData);
  }, [selectedPkg]);

  // Handle toggling an add-on
  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const isSelected = prev.find(a => a.id === addon.id);
      if (isSelected) return prev.filter(a => a.id !== addon.id);
      return [...prev, addon];
    });
  };

  // Manage background scroll lock and Lenis lifecycle when modal is open
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Client Details Form State (matching CRM Proforma Invoice fields)
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
    address: '',
    city: 'Delhi',
    state: 'Delhi',
    pinCode: '',
    gstin: '',
    tanNo: '',
    paymentMode: 'NEFT/RTGS',
    paymentStatus: 'Full Payment Pending', // 'Full Payment Pending' | 'Partial Received' | 'Full Payment Received'
    receivedAmount: '', // amount when partial received
    discountAmount: '', // Discount entered in ₹ or %
    gstRate: 18,
    clientRemark: '', // Client remark / special instruction
    notes: '',
  });

  // CRM Context Integration for Existing Clients (Renewal / Upsell)
  let authContext = {};
  try {
    authContext = useAuth() || {};
  } catch (e) {
    authContext = {};
  }
  const { clients: crmClients = [], deals: crmDeals = [] } = authContext;

  // Real-time backend client fetching for prittal2 & external environments
  const [fetchedClients, setFetchedClients] = useState([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingClients(true);
    fetchCrmClients()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setFetchedClients(data);
        }
      })
      .catch((err) => {
        console.warn('Notice loading CRM clients:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingClients(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Existing Client & Renewal / Upsell Selection State
  const [clientMode, setClientMode] = useState(() => (client || deal) ? 'existing' : 'new');
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(() => {
    if (client) {
      return {
        id: client.id || client._id,
        companyName: client.companyName || client.company || client.name || '',
        name: client.contactPerson || client.clientName || client.name || '',
        designation: client.designation || 'Director',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || client.street || '',
        city: client.city || 'Delhi',
        state: client.state || 'Delhi',
        pinCode: client.pinCode || '',
        gstin: client.gstin || '',
        currentPlan: client.projects || client.services || client.plan || '',
      };
    }
    if (deal) {
      return {
        id: deal.id || deal._id,
        companyName: deal.companyName || deal.company || deal.clientName || '',
        name: deal.contactPerson || deal.clientName || '',
        designation: deal.designation || 'Director',
        email: deal.clientEmail || deal.email || '',
        phone: deal.clientPhone || deal.phone || '',
        address: deal.address || '',
        city: deal.city || 'Delhi',
        state: deal.state || 'Delhi',
        pinCode: deal.pinCode || '',
        gstin: deal.gstin || '',
        currentPlan: deal.planName || deal.title || '',
      };
    }
    return null;
  });
  const [saleType, setSaleType] = useState('new_service'); // 'renewal' | 'upsell' | 'new_service'

  // Map and deduplicate existing clients & deals from CRM
  const clientOptions = useMemo(() => {
    const map = new Map();
    const allSources = [...(crmClients || []), ...(fetchedClients || [])];
    allSources.forEach(c => {
      const nameKey = (c.companyName || c.company || c.brandName || c.name || c.contact || '').trim();
      if (nameKey && !map.has(nameKey.toLowerCase())) {
        map.set(nameKey.toLowerCase(), {
          id: c.id || c._id || nameKey,
          companyName: c.companyName || c.company || c.brandName || '',
          name: c.contactPerson || c.clientName || c.name || c.contact || '',
          designation: c.designation || c.roleTitle || 'Founder / Director',
          email: c.email || '',
          phone: c.phone || c.contactPhone || c.mobile || '',
          address: c.address || c.street || '',
          city: c.city || 'Delhi',
          state: c.state || 'Delhi',
          pinCode: c.pinCode || c.postalCode || '',
          gstin: c.gstin || c.taxId || '',
          currentPlan: c.projects || c.services || c.plan || '',
        });
      }
    });

    (crmDeals || []).forEach(d => {
      const nameKey = (d.companyName || d.company || d.clientName || '').trim();
      if (nameKey && !map.has(nameKey.toLowerCase())) {
        map.set(nameKey.toLowerCase(), {
          id: d.id || d._id || nameKey,
          companyName: d.companyName || d.company || d.clientName || '',
          name: d.contactPerson || d.clientName || '',
          designation: d.designation || 'Director',
          email: d.clientEmail || d.email || '',
          phone: d.clientPhone || d.phone || '',
          address: d.address || '',
          city: d.city || 'Delhi',
          state: d.state || 'Delhi',
          pinCode: d.pinCode || '',
          gstin: d.gstin || '',
          currentPlan: d.planName || d.title || '',
        });
      }
    });

    return Array.from(map.values());
  }, [crmClients, crmDeals, fetchedClients]);

  const filteredClients = useMemo(() => {
    if (!clientSearchQuery.trim()) return clientOptions.slice(0, 15);
    const q = clientSearchQuery.toLowerCase().trim();
    return clientOptions.filter(c => 
      (c.companyName || '').toLowerCase().includes(q) ||
      (c.name || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q) ||
      (c.email || '').toLowerCase().includes(q)
    ).slice(0, 20);
  }, [clientOptions, clientSearchQuery]);

  const handleSelectExistingClient = (c) => {
    setSelectedClient(c);
    setFormData(prev => ({
      ...prev,
      companyName: c.companyName || prev.companyName,
      name: c.name || prev.name,
      designation: c.designation || prev.designation || 'Director',
      email: c.email || prev.email,
      phone: c.phone || prev.phone,
      address: c.address || prev.address,
      city: c.city || prev.city || 'Delhi',
      state: c.state || prev.state || 'Delhi',
      pinCode: c.pinCode || prev.pinCode,
      gstin: c.gstin || prev.gstin,
    }));
    
    // Default to renewal if client has existing plan
    const type = c.currentPlan ? 'renewal' : 'new_service';
    setSaleType(type);
    const cName = c.companyName || c.name;
    const pkgTitle = selectedPkg?.categoryTitle || 'Service';
    const tier = selectedPkg?.tierName || 'Standard';
    const remark = type === 'renewal'
      ? `Plan Renewal: ${pkgTitle} (${tier}) — Renewal cycle & service continuity for ${cName}.`
      : `Contract Agreement: ${pkgTitle} (${tier}) for ${cName}.`;
    setFormData(prev => ({
      ...prev,
      clientRemark: remark,
      notes: remark
    }));
  };

  const handleSetSaleType = (type) => {
    setSaleType(type);
    const cName = selectedClient?.companyName || selectedClient?.name || formData.companyName || 'Client';
    const pkgTitle = selectedPkg?.categoryTitle || 'Package';
    const tier = selectedPkg?.tierName || 'Standard';

    let remark = '';
    if (type === 'renewal') {
      remark = `Plan Renewal: ${pkgTitle} (${tier}) — Renewal cycle & service continuity for ${cName}.`;
    } else if (type === 'upsell') {
      remark = `Upsell / Scope Expansion: Additional ${pkgTitle} (${tier}) deliverables & active retainer add-on for ${cName}.`;
    } else {
      remark = `New Service Contract: ${pkgTitle} (${tier}) onboarded for ${cName}.`;
    }

    setFormData(prev => ({
      ...prev,
      clientRemark: remark,
      notes: remark
    }));
  };

  // À La Carte State & Handlers (Strictly Single Service Selection)
  const [selectedALaCarteItem, setSelectedALaCarteItem] = useState(() => A_LA_CARTE_SERVICES[0]);
  const [aLaCarteBudget, setALaCarteBudget] = useState(() => A_LA_CARTE_SERVICES[0].price || 5000);
  const [customALaCarteInput, setCustomALaCarteInput] = useState('');

  // Custom Package Drawer Sidebar State
  const [isCustomDrawerOpen, setIsCustomDrawerOpen] = useState(false);

  // Determine active category for Custom Package Builder from currently selected plan
  const currentCategoryForCustom = useMemo(() => {
    if (selectedPkg?.categoryId && selectedPkg.categoryId !== 'a-la-carte' && selectedPkg.categoryId !== 'custom-package') {
      const found = packagesData.find(c => c.id === selectedPkg.categoryId || c.title === selectedPkg.categoryTitle);
      if (found) return found;
    }
    return packagesData[0];
  }, [selectedPkg]);

  const handleSelectALaCarteItem = (item) => {
    setSelectedALaCarteItem(item);
    const budget = item.price || 5000;
    setALaCarteBudget(budget);

    const pkg = {
      categoryId: 'a-la-carte',
      categoryTitle: 'À LA CARTE',
      categorySubtitle: 'Single Service Deliverable',
      tierId: 'a-la-carte',
      tierName: item.name,
      billingCycle: 'one-time',
      priceText: `₹${budget.toLocaleString('en-IN')}`,
      userBudget: budget,
      isCustom: true,
      selectedALaCarteItems: [item],
      activeDetails: [item.name],
      activeCount: 1
    };

    setSelectedPkg(pkg);
    setCheckedServices(getInitialCheckedServices(pkg));
  };

  const handleSelectALaCarteCategory = () => {
    const item = selectedALaCarteItem || A_LA_CARTE_SERVICES[0];
    const budget = aLaCarteBudget > 0 ? aLaCarteBudget : (item.price || 5000);

    const pkg = {
      categoryId: 'a-la-carte',
      categoryTitle: 'À LA CARTE',
      categorySubtitle: 'Single Service Deliverable',
      tierId: 'a-la-carte',
      tierName: item.name,
      billingCycle: 'one-time',
      priceText: `₹${budget.toLocaleString('en-IN')}`,
      userBudget: budget,
      isCustom: true,
      selectedALaCarteItems: [item],
      activeDetails: [item.name],
      activeCount: 1
    };

    setSelectedPkg(pkg);
    setCheckedServices(getInitialCheckedServices(pkg));
    setSelectedAddons([]);
  };

  const handleUpdateALaCarteBudget = (newBudget) => {
    const num = Math.max(0, Number(newBudget) || 0);
    setALaCarteBudget(num);

    setSelectedPkg(prev => ({
      ...prev,
      userBudget: num,
      priceText: `₹${num.toLocaleString('en-IN')}`
    }));
  };

  const handleAddCustomALaCarteItem = () => {
    if (!customALaCarteInput.trim()) return;
    const newItem = {
      id: `custom-alc-${Date.now()}`,
      name: customALaCarteInput.trim(),
      desc: 'Custom specified single deliverable',
      price: aLaCarteBudget > 0 ? aLaCarteBudget : 5000
    };
    setCustomALaCarteInput('');
    handleSelectALaCarteItem(newItem);
  };

  // Custom Package Drawer Handlers
  const handleOpenCustomPackageDrawer = () => {
    setIsCustomDrawerOpen(true);
  };

  const handleSelectCustomPackageCategory = () => {
    if (selectedPkg?.categoryId !== 'custom-package' && !selectedPkg?.isCustom) {
      const title = currentCategoryForCustom?.title || 'CUSTOM GROWTH PACKAGE';
      const defaultBudget = 35000;
      const initialDeliverables = selectedPkg?.activeDetails?.length 
        ? selectedPkg.activeDetails 
        : [`Custom tailored scope for ${title}`];
        
      const pkg = {
        categoryId: 'custom-package',
        categoryTitle: title,
        categorySubtitle: currentCategoryForCustom?.subtitle || 'Custom Tailored Scope & Deliverables',
        tierId: 'custom',
        tierName: 'CUSTOM PACKAGE',
        billingCycle: selectedPkg?.billingCycle || 'monthly',
        priceText: `₹${defaultBudget.toLocaleString('en-IN')}`,
        userBudget: defaultBudget,
        isCustom: true,
        activeDetails: initialDeliverables,
        activeCount: initialDeliverables.length,
        customSummary: initialDeliverables.join(', ')
      };
      setSelectedPkg(pkg);
      setCheckedServices(getInitialCheckedServices(pkg));
    }
    setIsCustomDrawerOpen(true);
  };

  const handleSelectCustomTier = (catTitle, compiledScopeString, customData) => {
    const finalPkg = {
      ...customData,
      categoryId: customData?.categoryId || currentCategoryForCustom.id,
      categoryTitle: customData?.categoryTitle || currentCategoryForCustom.title,
      categorySubtitle: customData?.categorySubtitle || currentCategoryForCustom.subtitle,
      tierId: 'custom',
      tierName: customData?.tierName || 'Custom Build',
      billingCycle: customData?.billingCycle || selectedPkg?.billingCycle || 'monthly',
      priceText: customData?.priceText || `₹${(customData?.userBudget || 35000).toLocaleString('en-IN')}`,
      userBudget: customData?.userBudget || 35000,
      activeDetails: customData?.activeDetails || [],
      activeCount: customData?.activeCount || (customData?.activeDetails || []).length,
      isCustom: true,
      customSummary: customData?.customSummary || (customData?.activeDetails || []).join(', ')
    };
    setSelectedPkg(finalPkg);
    setCheckedServices(getInitialCheckedServices(finalPkg));
    setSelectedAddons([]);
    setIsCustomDrawerOpen(false);
  };

  const handleUpdateCustomPkgField = (field, val) => {
    const updatedForm = { ...customPkgForm, [field]: val };
    setCustomPkgForm(updatedForm);

    if (selectedPkg?.categoryId === 'custom-package') {
      const rawLines = (field === 'deliverablesText' ? val : updatedForm.deliverablesText)
        .split('\n')
        .map(l => l.replace(/^[•\-\*]\s*/, '').trim())
        .filter(Boolean);

      const services = field === 'selectedServices' ? val : updatedForm.selectedServices;
      const deliverables = Array.from(new Set([...services, ...rawLines]));
      const priceNum = Number(field === 'price' ? val : updatedForm.price) || 35000;
      const cycle = field === 'billingCycle' ? val : updatedForm.billingCycle;
      const title = field === 'title' ? val : updatedForm.title;
      const tierName = field === 'tierName' ? val : updatedForm.tierName;

      const pkg = {
        categoryId: 'custom-package',
        categoryTitle: title || 'CUSTOM GROWTH PACKAGE',
        categorySubtitle: 'Custom Tailored Scope & Deliverables',
        tierId: 'custom',
        tierName: tierName || 'BESPOKE RETAINER',
        billingCycle: cycle || 'monthly',
        priceText: `₹${priceNum.toLocaleString('en-IN')}`,
        userBudget: priceNum,
        isCustom: true,
        activeDetails: deliverables,
        activeCount: deliverables.length,
        customSummary: deliverables.join(', ')
      };

      setSelectedPkg(pkg);
      setCheckedServices(getInitialCheckedServices(pkg));
    }
  };

  const handleToggleCustomServiceChip = (serviceName) => {
    const current = customPkgForm.selectedServices;
    const updated = current.includes(serviceName)
      ? current.filter(s => s !== serviceName)
      : [...current, serviceName];
    handleUpdateCustomPkgField('selectedServices', updated);
  };

  // Financial & Package Calculation Logic
  const getPackageFinancials = (pkg = selectedPkg) => {
    // Check if custom budget is passed
    let originalBase = 25000;
    if (pkg?.userBudget && Number(pkg.userBudget) > 0) {
      originalBase = Number(pkg.userBudget);
    } else if (pkg?.selectedALaCarteItems && pkg.selectedALaCarteItems.length > 0) {
      const aLaCarteSum = pkg.selectedALaCarteItems.reduce((sum, item) => sum + (item.price || 0), 0);
      originalBase = aLaCarteSum > 0 ? aLaCarteSum : 10000;
    } else {
      const rawPriceText = pkg?.priceInfo?.priceText || pkg?.priceText || '';
      const numericMatch = rawPriceText.replace(/,/g, '').match(/\d+/);
      if (numericMatch) {
        originalBase = Number(numericMatch[0]);
      } else {
        const catData = packagesData.find(c => c.id === pkg?.categoryId);
        if (catData) {
          const tierData = catData.tiers.find(t => t.id === pkg?.tierId);
          if (tierData && tierData.price) {
            originalBase = tierData.price;
          } else if (catData.basePrice) {
            originalBase = catData.basePrice;
          } else {
            originalBase = 25000;
          }
        } else {
          originalBase = 25000;
        }
      }
    }

    // Calculate applied discount (supports ₹ fixed amount or % percentage e.g. 10%)
    let discount = 0;
    const rawDisc = String(formData.discountAmount || '').trim();
    if (rawDisc.endsWith('%')) {
      const pct = Number(rawDisc.replace('%', ''));
      if (!isNaN(pct) && pct > 0) {
        discount = Math.round(originalBase * (pct / 100));
      }
    } else {
      const numDisc = Number(rawDisc.replace(/,/g, ''));
      if (!isNaN(numDisc) && numDisc > 0) {
        discount = Math.min(originalBase, numDisc);
      }
    }

    // Add selected add-ons price
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    originalBase += addonsTotal;

    const baseAfterDiscount = Math.max(0, originalBase - discount);
    const gstRate = formData.gstRate !== undefined ? Number(formData.gstRate) : 18;
    const gst = Math.round(baseAfterDiscount * (gstRate / 100));
    const total = baseAfterDiscount + gst;

    // Calculate dynamic received and balance amounts based on paymentStatus
    let received = 0;
    if (formData.paymentStatus === 'Partial Received') {
      const parsedVal = Number(String(formData.receivedAmount).replace(/,/g, ''));
      received = isNaN(parsedVal) ? 0 : Math.max(0, Math.min(parsedVal, total));
    } else if (formData.paymentStatus === 'Full Payment Received') {
      received = total;
    } else {
      // 'Full Payment Pending'
      received = 0;
    }

    const balance = Math.max(total - received, 0);

    return {
      baseAmount: originalBase,
      discountAmount: discount,
      baseAfterDiscount,
      gstRate,
      gstAmount: gst,
      totalAmount: total,
      receivedAmount: received,
      balanceAmount: balance
    };
  };

  const financialData = getPackageFinancials(selectedPkg);

  // Same-Page Direct Print & PDF Download Handler (No Popups, Native A4 Formatting)
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    // Remove any existing print iframe if present
    const oldIframe = document.getElementById('same-page-print-iframe');
    if (oldIframe) {
      oldIframe.remove();
    }

    // Create an invisible iframe directly on the SAME page to avoid popup blockers and disorienting new windows
    const iframe = document.createElement('iframe');
    iframe.id = 'same-page-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<!DOCTYPE html><html><head>');
    doc.write('<title>' + docCode + ' - Prittal Proforma Invoice</title>');

    // Copy parent styles to retain all Tailwind utility and custom CSS styles
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((el) => el.outerHTML)
      .join('\n');
    doc.write(styles);

    doc.write(`
      <style>
        @page { 
          size: A4 portrait; 
          margin: 0; 
        }
        * { 
          box-sizing: border-box; 
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important; 
        }
        html, body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
          color: #0f172a; 
          margin: 0 !important; 
          padding: 0 !important; 
          background: #ffffff !important;
          width: 210mm !important;
          min-width: 210mm !important;
          max-width: 210mm !important;
          height: auto !important;
          overflow: visible !important;
        }
        .page-container { 
          width: 210mm !important; 
          max-width: 210mm !important;
          min-width: 210mm !important;
          height: 297mm !important;
          min-height: 297mm !important;
          max-height: 297mm !important;
          box-sizing: border-box !important;
          position: relative !important; 
          background: #ffffff !important; 
          margin: 0 auto !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          overflow: hidden !important;
        }
        .page-1 {
          padding: 16px 22px 0px 22px !important; 
          ${includeTerms ? 'page-break-after: always !important; break-after: page !important;' : 'page-break-after: avoid !important; break-after: avoid !important;'}
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        .page-2 {
          border: none !important;
          border-top: none !important;
          margin-top: 0 !important;
          padding: 24px 22px 16px 22px !important;
          page-break-before: always !important;
          break-before: page !important;
          page-break-after: avoid !important;
          break-after: avoid !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        .page-bottom-ribbon {
          margin-left: -22px !important;
          margin-right: -22px !important;
          margin-bottom: 0 !important;
          margin-top: auto !important;
          border-radius: 0 !important;
          width: calc(100% + 44px) !important;
          box-sizing: border-box !important;
          page-break-before: avoid !important;
          break-before: avoid !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        .page-bottom-footer {
          margin-top: auto !important;
          margin-bottom: 0 !important;
          padding-top: 10px !important;
          padding-bottom: 8px !important;
        }
        .underline-input { 
          border-bottom: 1px solid #94a3b8; 
          display: inline-block; 
          font-size: 11px; 
          color: #0f172a; 
          padding: 0 4px; 
          min-height: 16px; 
        }
        table { 
          border-collapse: collapse; 
          width: 100%; 
        }
        @media print {
          @page { 
            size: A4 portrait; 
            margin: 0; 
          }
          html, body { 
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            margin: 0 !important; 
            padding: 0 !important; 
            background: #ffffff !important; 
            overflow: visible !important;
          }
          .page-container {
            width: 210mm !important;
            max-width: 210mm !important;
            min-width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .page-1 { 
            padding: 16px 22px 0px 22px !important;
            page-break-before: auto !important;
            break-before: auto !important;
            ${includeTerms ? 'page-break-after: always !important; break-after: page !important;' : 'page-break-after: avoid !important; break-after: avoid !important;'}
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .page-2 {
            border: none !important;
            border-top: none !important;
            margin-top: 0 !important;
            padding: 24px 22px 16px 22px !important;
            page-break-before: always !important;
            break-before: page !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .page-bottom-ribbon {
            margin-left: -22px !important;
            margin-right: -22px !important;
            margin-bottom: 0 !important;
            margin-top: auto !important;
            border-radius: 0 !important;
            width: calc(100% + 44px) !important;
            box-sizing: border-box !important;
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .page-bottom-footer {
            margin-top: auto !important;
            margin-bottom: 0 !important;
            padding-top: 10px !important;
            padding-bottom: 8px !important;
          }
          .no-print { 
            display: none !important; 
          }
        }
      </style>
    </head><body>`);
    doc.write(printContent.innerHTML);
    doc.write('</body></html>');
    doc.close();

    // Trigger print directly on the iframe without opening a new window or popups
    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (e) {
        console.error('Same-page print error:', e);
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 60000);
      }
    }, 400);
  };

  const handleDirectDownloadPDF = async () => {
    if (!printRef.current) return;
    
    // Create a deep clone to avoid modifying the original DOM
    const printContent = printRef.current.cloneNode(true);
    
    // Replace all form elements with spans to preserve values visually
    const inputs = printContent.querySelectorAll('input, textarea, select');
    const originalInputs = printRef.current.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input, index) => {
      const originalInput = originalInputs[index];
      const span = document.createElement('span');
      span.className = 'underline-input';
      span.textContent = originalInput.value || originalInput.placeholder || '';
      input.parentNode.replaceChild(span, input);
    });
    
    const wrapper = document.createElement('div');
    
    // Attach styles necessary for html2pdf
    const style = document.createElement('style');
    style.innerHTML = `
      * { box-sizing: border-box !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      html, body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; background: #ffffff !important; width: 210mm; min-width: 210mm; max-width: 210mm; }
      .page-container { width: 210mm; max-width: 210mm; min-width: 210mm; height: 297mm; min-height: 297mm; max-height: 297mm; position: relative; background: #ffffff !important; margin: 0 auto; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; overflow: hidden; }
      .page-1 { padding: 16px 22px 0px 22px; page-break-before: auto; break-before: auto; ${includeTerms ? 'page-break-after: always; break-after: page;' : 'page-break-after: avoid; break-after: avoid;'} page-break-inside: avoid; break-inside: avoid; }
      .page-2 { border: none !important; border-top: none !important; margin-top: 0 !important; padding: 24px 22px 16px 22px; page-break-before: always; break-before: page; page-break-after: avoid; break-after: avoid; page-break-inside: avoid; break-inside: avoid; }
      .page-bottom-ribbon { margin-left: -22px !important; margin-right: -22px !important; margin-bottom: 0 !important; margin-top: auto !important; width: calc(100% + 44px) !important; box-sizing: border-box !important; page-break-before: avoid; break-before: avoid; }
      .page-bottom-footer { margin-top: auto !important; margin-bottom: 0 !important; padding-top: 10px !important; padding-bottom: 8px !important; }
      .underline-input { border-bottom: 1px solid #94a3b8; display: inline-block; font-size: 11px; color: #0f172a; padding: 0 4px; min-height: 16px; }
      table { border-collapse: collapse; width: 100%; }
      .no-print { display: none !important; }
    `;
    wrapper.appendChild(style);
    wrapper.innerHTML += printContent.innerHTML;
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0,
        filename: `Prittal_Invoice_${docCode}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };
      html2pdf().set(opt).from(wrapper).save();
    } catch (e) {
      console.error('PDF Download error:', e);
      // Fallback to print if html2pdf fails
      handlePrint();
    }
  };

  // Gmail Dispatch Modal State (Matching CRM DocumentPreviewDrawer)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalData, setEmailModalData] = useState({
    clientEmail: '',
    ccEmail: 'sales@prittal.com',
    subject: '',
    error: '',
  });

  // Handler to open the Gmail Dispatch Dialog
  const handleOpenGmailModal = () => {
    const companyTitle = formData.companyName || formData.name || 'Valued Client';
    setEmailModalData({
      clientEmail: formData.email || '',
      ccEmail: AGENCY_DETAILS.email || 'sales@prittal.com',
      subject: `[${docCode}] Official Scope & Proforma Invoice — ${companyTitle} | Prittal Digital Agency`,
      error: '',
    });
    setIsEmailModalOpen(true);
  };

  // Direct Gmail Send Handler triggered from the Dispatch Modal
  const handleConfirmSendGmail = () => {
    const trimmedEmail = emailModalData.clientEmail.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setEmailModalData((prev) => ({
        ...prev,
        error: 'Please enter a valid client recipient email address.',
      }));
      return;
    }

    // Sync back to formData so the invoice document also has this email
    if (formData.email !== trimmedEmail) {
      setFormData((prev) => ({ ...prev, email: trimmedEmail }));
    }

    // 1. Build structured body text matching CRM format
    const emailBody = buildInvoiceEmailText({
      clientData: { ...formData, email: trimmedEmail },
      packageInfo: selectedPkg,
      financialData,
      docCode,
      checkedServices,
      selectedAddons,
    });

    const to = encodeURIComponent(trimmedEmail);
    const cc = encodeURIComponent(emailModalData.ccEmail.trim() || AGENCY_DETAILS.email || 'sales@prittal.com');
    const subject = encodeURIComponent(emailModalData.subject.trim());
    const body = encodeURIComponent(emailBody);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&cc=${cc}&su=${subject}&body=${body}`;

    // Auto-download PDF so user can attach it
    handleDirectDownloadPDF();

    // 2. Close modal and open Gmail in a new tab without popup blocker conflict
    setIsEmailModalOpen(false);
    window.open(gmailUrl, '_blank');
  };

  // WhatsApp Dispatch Handler — sends PI details & bank info directly via WhatsApp
  const handleWhatsApp = () => {
    // Trigger PDF generation so the user can save and attach it manually
    handleDirectDownloadPDF();

    const companyTitle = formData.companyName || formData.name || 'Valued Client';
    const message = `*PRITTAL CREATIVE AGENCY — OFFICIAL PROFORMA INVOICE*
Ref: *${docCode}*
Date: ${new Date().toLocaleDateString('en-GB')}

*Client / Advertiser:* ${companyTitle}
*Scope:* ${selectedPkg?.categoryTitle || 'Digital Retainer'} (${selectedPkg?.tierName || 'Custom Scope'})
*Total Amount:* ₹${formatINR(financialData.totalAmount)} (Incl. ${financialData.gstRate}% GST)
*Status:* ${formData.paymentStatus}

*Beneficiary Bank Details:*
• Beneficiary: ${AGENCY_DETAILS.bank.beneficiary}
• Account No: ${AGENCY_DETAILS.bank.accountNo}
• IFSC: ${AGENCY_DETAILS.bank.ifsc}
• Bank: ${AGENCY_DETAILS.bank.bankName}

Official 2-Page printable PI attached. For questions, reply directly to this message.`;

    const phoneClean = (formData.phone || '').replace(/[^0-9]/g, '');
    const targetPhone = phoneClean.length >= 10 ? (phoneClean.length === 10 ? `91${phoneClean}` : phoneClean) : '';
    const url = targetPhone
      ? `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
  };

  // Send for Approval Handler — opens Gmail to send PI to management for negotiation approval
  const handleSendForApproval = () => {
    const companyTitle = formData.companyName || formData.name || 'Valued Client';
    const approvalBody = `Dear Management,

Please review and approve the following Proforma Invoice for client negotiation acceptance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROFORMA INVOICE — APPROVAL REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PI Reference: ${docCode}
Date: ${new Date().toLocaleDateString('en-GB')}

Client / Advertiser: ${companyTitle}
Contact Person: ${formData.name || 'N/A'} ${formData.designation ? `(${formData.designation})` : ''}
Email: ${formData.email || 'N/A'}
Phone: ${formData.phone || 'N/A'}

Package: ${selectedPkg?.categoryTitle || 'Digital Service'} — ${selectedPkg?.tierName || 'Custom'}
Billing: ${selectedPkg?.billingCycle === 'annual' ? 'Annual Plan' : selectedPkg?.billingCycle === 'one-time' ? 'One-Time Project' : 'Monthly Retainer'}

━━━━━━━━ FINANCIAL BREAKDOWN ━━━━━━━━

  Base Amount:     ₹${formatINR(financialData.baseAmount)}
  GST (${financialData.gstRate}%):       ₹${formatINR(financialData.gstAmount)}
  ─────────────────────────
  TOTAL:           ₹${formatINR(financialData.totalAmount)}

  Payment Status:  ${formData.paymentStatus}
  Payment Mode:    ${formData.paymentMode}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACTION REQUIRED:
Please reply with APPROVED or provide negotiation feedback.
Once approved, the official PI will be dispatched to the client via email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Regards,
Sales Desk — Prittal Creative Agency
${AGENCY_DETAILS.website}`;

    const to = encodeURIComponent(AGENCY_DETAILS.email || 'sales@prittal.com');
    const subject = encodeURIComponent(`[APPROVAL REQUIRED] PI ${docCode} — ${companyTitle} | ${selectedPkg?.categoryTitle || 'Service'} (${selectedPkg?.tierName || 'Custom'})`);
    const body = encodeURIComponent(approvalBody);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const [submitError, setSubmitError] = useState(null);

  // Form Submit Handler to notify sales team via FormSubmit & sync directly to CRM
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const orderPayload = {
        proforma_invoice_no: docCode,
        company_name: formData.companyName || formData.name,
        contact_person: formData.name,
        designation: formData.designation || 'Not Specified',
        client_email: formData.email,
        client_phone: formData.phone || 'Not Provided',
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pinCode}`,
        gstin: formData.gstin || 'N/A',
        tan_no: formData.tanNo || 'N/A',
        selected_package: `${selectedPkg?.categoryTitle || 'Service'} - ${selectedPkg?.tierName || 'Custom'}`,
        billing_cycle: selectedPkg?.billingCycle || 'Standard',
        services_sold: activeSoldServices.join(', '),
        deliverables_summary: getDeliverablesSummary(selectedPkg),
        original_base_amount: financialData.originalBaseAmount,
        discount_applied: financialData.discountAmount,
        base_taxable_amount: financialData.baseAmount,
        gst_18_percent: financialData.gstAmount,
        total_amount_incl_gst: financialData.totalAmount,
        payment_mode: formData.paymentMode,
        payment_status: formData.paymentStatus,
        received_amount: financialData.receivedAmount,
        balance_amount: financialData.balanceAmount,
        client_notes: formData.notes || 'N/A',
      };

      // 1. Sync directly to CRM Backend (creates Sales Contract, Client, Deal, Lead & Projects)
      let crmSuccess = false;
      try {
        const crmResult = await syncPackageOrderToCrm(orderPayload);
        crmSuccess = Boolean(crmResult?.success);
      } catch (crmErr) {
        console.warn('CRM sync notice:', crmErr);
      }

      // 2. Email dispatch via FormSubmit (kept for email redundancy)
      try {
        const response = await fetch('https://formsubmit.co/ajax/sales@prittal.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            ...orderPayload,
            original_base_amount: `₹${formatINR(financialData.originalBaseAmount)}`,
            discount_applied: financialData.discountAmount > 0 ? `- ₹${formatINR(financialData.discountAmount)}` : 'None',
            base_taxable_amount: `₹${formatINR(financialData.baseAmount)}`,
            gst_18_percent: `₹${formatINR(financialData.gstAmount)}`,
            total_amount_incl_gst: `₹${formatINR(financialData.totalAmount)}`,
            received_amount: `₹${formatINR(financialData.receivedAmount)}`,
            balance_amount: `₹${formatINR(financialData.balanceAmount)}`,
            _subject: `New Proforma Invoice Generated: ${docCode} for ${formData.companyName || formData.name}`,
            _template: 'table',
          }),
        });

        if (!response.ok && !crmSuccess) {
          throw new Error('Failed to dispatch proforma invoice.');
        }
      } catch (formSubmitErr) {
        if (!crmSuccess) {
          throw formSubmitErr;
        }
        console.warn('FormSubmit notice (CRM sync succeeded):', formSubmitErr);
      }

      // Success flow
      try {
        sessionStorage.setItem('prittal_last_submission', JSON.stringify({
          type: 'package',
          name: formData.name || formData.companyName,
          company: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          package: `${selectedPkg?.categoryTitle || 'Package Order'} (${selectedPkg?.tierName || 'Custom'})`,
          proformaCode: docCode,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {}

      setIsSubmitting(false);
      onClose();
      if (onNavigate) {
        onNavigate('/thank-you');
      } else {
        window.location.href = '/thank-you';
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setSubmitError('Unable to process proforma request right now. Please check your network or reach out directly to sales@prittal.com.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const invoiceDate = new Date().toLocaleDateString('en-GB');
  const clientDisplayName = formData.companyName || formData.name || 'Advertiser / Client Name';
  const clientFullAddress = [formData.address, formData.city, formData.state].filter(Boolean).join(', ');

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-0 sm:p-4 md:p-6 transition-opacity animate-fadeIn overflow-y-auto">
      {/* Backdrop Click */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Modal Shell (Switches width dynamically based on active tab) */}
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className={`relative z-10 w-full rounded-none sm:rounded-3xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[94vh] border transition-all duration-300 overflow-hidden ${
          activeView === 'preview' ? 'max-w-5xl' : 'max-w-2xl'
        } ${
          isDark
            ? 'bg-[#0c121e] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
      >
        {/* Top Luxury Navigation & Action Bar */}
        <div className={`p-2.5 sm:p-5 flex-shrink-0 flex items-center justify-between gap-2 border-b ${
          isDark ? 'border-slate-800 bg-[#090d16]' : 'border-slate-200 bg-slate-50'
        }`}>
          {/* Left: View Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              type="button"
              onClick={() => setActiveView('form')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[10.5px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1 sm:space-x-1.5 cursor-pointer ${
                activeView === 'form'
                  ? 'bg-[#11b1d0] text-white shadow-md'
                  : isDark
                    ? 'text-slate-400 hover:text-white bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-200/70'
              }`}
            >
              <User className="w-3.5 h-3.5 flex-shrink-0" />
              <span>1. Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('preview')}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[10.5px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center space-x-1 sm:space-x-1.5 cursor-pointer ${
                activeView === 'preview'
                  ? 'bg-[#11b1d0] text-white shadow-md'
                  : isDark
                    ? 'text-slate-400 hover:text-white bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-200/70'
              }`}
            >
              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
              <span>2. Invoice</span>
              <span className="ml-0.5 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold">
                LIVE
              </span>
            </button>
          </div>

          {/* Right: Quick Action Buttons (Desktop only) & Close */}
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            {activeView === 'preview' && (
              <div className="hidden md:flex items-center space-x-1.5">
                {/* Direct Gmail Web Button */}
                <button
                  type="button"
                  onClick={handleOpenGmailModal}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-colors flex items-center space-x-1.5 cursor-pointer"
                  title="Open pre-filled in Gmail Web with invoice scope"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Send via Gmail</span>
                </button>

                {/* Send via WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors flex items-center space-x-1.5 cursor-pointer"
                  title="Share PI details via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>WhatsApp</span>
                </button>

                {/* Print / Save PDF Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white bg-[#11b1d0] hover:bg-[#0fa1be] shadow-sm transition-colors flex items-center space-x-1.5 cursor-pointer"
                  title="Print Official A4 PDF"
                >
                  <Printer className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Print</span>
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300'
              }`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 overscroll-contain">
          {submitted ? (
            /* Success State */
            <div className="text-center py-12 space-y-4 animate-scaleUp max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h3 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Proforma Invoice Dispatched!
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Reference: <strong className="text-[#11b1d0]">{docCode}</strong>. Your official Proforma Invoice & project specifications have been logged. A copy has been routed to <strong className="text-[#11b1d0]">{formData.email || 'your email'}</strong> and Prittal's executive sales team.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDirectGmailSend}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-red-700 transition-colors shadow-md flex items-center justify-center space-x-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Gmail</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#11b1d0] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#0fa1be] transition-colors shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          ) : activeView === 'form' ? (
            /* ========================================================================= */
            /* VIEW 1: CLIENT & ADVERTISER DETAILS FORM                                  */
            /* ========================================================================= */
            <div className="space-y-6">
              {/* Top Banner: Selected Package, Plan Details & Live Financial Summary */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-[#131b2c] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#11b1d0] block mb-0.5">
                      SELECTED PACKAGE PLAN & SERVICES
                    </span>
                    <h3 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <span>{selectedPkg?.categoryTitle || 'Digital Service Retainer'}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-black bg-[#11b1d0]/15 text-[#11b1d0] border border-[#11b1d0]/30 uppercase">
                        {selectedPkg?.tierName || 'Standard'}
                      </span>
                    </h3>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span>Billing: <strong>{selectedPkg?.billingCycle === 'annual' ? 'Annual Plan (Discounted)' : selectedPkg?.billingCycle === 'one-time' ? 'One-Time Project' : 'Monthly Retainer'}</strong></span>
                      {selectedPkg?.billingCycle !== 'one-time' && (
                        <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-800/80 border border-slate-700/80 ml-1">
                          <button
                            type="button"
                            onClick={() => handleToggleModalBillingCycle('monthly')}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                              selectedPkg?.billingCycle === 'monthly'
                                ? 'bg-[#11b1d0] text-white shadow-xs'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleModalBillingCycle('annual')}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                              selectedPkg?.billingCycle === 'annual'
                                ? 'bg-[#11b1d0] text-white shadow-xs'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Annual
                          </button>
                        </div>
                      )}
                      <span>•</span>
                      <span className="text-emerald-500 font-bold">{activeSoldServices.length} Active Services Sold</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right flex-shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Total with {financialData.gstRate}% GST</span>
                    <span className="text-xl sm:text-2xl font-black text-[#11b1d0]">
                      ₹{formatINR(financialData.totalAmount)}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 block">
                      (Base: ₹{formatINR(financialData.baseAmount)} + GST: ₹{formatINR(financialData.gstAmount)})
                    </span>
                  </div>
                </div>

                {/* Sold Services Chips Preview */}
                <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="text-[10px] font-black uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Services Included & Sold in this Plan:</span>
                    <button
                      type="button"
                      onClick={() => setIsPlanSelectorOpen(!isPlanSelectorOpen)}
                      className="text-[11px] font-extrabold text-[#11b1d0] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{isPlanSelectorOpen ? 'Hide Plan Selector' : 'Change Plan / Services'}</span>
                      {isPlanSelectorOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {activeSoldServices.map((service, sIdx) => (
                      <span
                        key={sIdx}
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          isDark 
                            ? 'bg-[#11b1d0]/20 text-[#38d4f2] border-[#11b1d0]/40' 
                            : 'bg-[#11b1d0]/10 text-[#0e8da6] border-[#11b1d0]/30'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 mr-1 stroke-[3]" />
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Plan Inclusions Summary */}
                  {planFeaturesList.length > 0 && (
                    <div className="mt-2.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-800 dark:text-slate-200">Included in Plan:</strong>{' '}
                      {planFeaturesList.join(' • ')}
                    </div>
                  )}

                  {/* Available Add-ons Summary */}
                  {parseableAddons.length > 0 && (
                    <div className="mt-2 text-[11px] leading-relaxed">
                      <strong className="block mb-2 text-slate-800 dark:text-slate-200">Optional Add-ons:</strong>
                      <div className="flex flex-wrap gap-2">
                        {parseableAddons.map((addon, idx) => {
                          const isSelected = selectedAddons.some(a => a.id === addon.id);
                          return (
                            <label
                              key={idx}
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-md border cursor-pointer select-none transition-colors ${
                                isSelected 
                                  ? isDark ? 'bg-cyan-900/40 border-cyan-500/50 text-cyan-300' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
                                  : isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleAddon(addon)}
                                className="w-3 h-3 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500 cursor-pointer"
                              />
                              <span className="font-medium">{addon.name}</span>
                              <span className="text-[10px] opacity-80">(₹{formatINR(addon.price)})</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Expandable Plan & Tier Switcher */}
                  {isPlanSelectorOpen && (
                    <div className={`mt-3 p-3.5 rounded-xl border space-y-3 animate-fadeIn ${
                      isDark 
                        ? 'bg-[#090d16] border-slate-700/80 text-white' 
                        : 'bg-slate-100/90 border-slate-200 text-slate-900'
                    }`}>
                      <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Switch Package Category:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {packagesData.map((cat) => {
                          const isCatSelected = selectedPkg?.categoryId === cat.id;
                          const popularTier = cat.tiers.find(t => t.isPopular) || cat.tiers[0];
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => handleSwitchPackage(cat, popularTier)}
                              className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                                isCatSelected
                                  ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md ring-2 ring-[#11b1d0]/30'
                                  : isDark
                                    ? 'bg-[#131b2c] border-slate-700 text-slate-200 hover:border-[#11b1d0] hover:bg-[#1a253c] hover:text-white'
                                    : 'bg-white border-slate-300 text-slate-800 hover:border-[#11b1d0] hover:bg-slate-50 hover:text-slate-950 shadow-xs'
                              }`}
                            >
                              <div className="leading-tight font-extrabold">{cat.title}</div>
                              <div className={`text-[10px] mt-1 font-medium ${
                                isCatSelected 
                                  ? 'text-white/90' 
                                  : isDark 
                                    ? 'text-slate-400' 
                                    : 'text-slate-500'
                              }`}>
                                {(() => {
                                  if (isCatSelected) {
                                    const selectedTier = cat.tiers.find(t => t.id === selectedPkg?.tierId) || cat.tiers[0];
                                    return `₹${(selectedTier.price || cat.basePrice || 10000).toLocaleString('en-IN')}`;
                                  }
                                  return `from ₹${(cat.basePrice || 10000).toLocaleString('en-IN')}`;
                                })()}
                              </div>
                            </button>
                          );
                        })}

                        {/* 8. À LA CARTE Tile */}
                        <button
                          type="button"
                          onClick={handleSelectALaCarteCategory}
                          className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                            selectedPkg?.categoryId === 'a-la-carte'
                              ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md ring-2 ring-[#11b1d0]/30'
                              : isDark
                                ? 'bg-[#131b2c] border-slate-700 text-slate-200 hover:border-[#11b1d0] hover:bg-[#1a253c] hover:text-white'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-[#11b1d0] hover:bg-slate-50 hover:text-slate-950 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="leading-tight font-extrabold">À LA CARTE</div>
                            <ShoppingBag className="w-3.5 h-3.5 opacity-80" />
                          </div>
                          <div className={`text-[10px] mt-1 font-medium ${
                            selectedPkg?.categoryId === 'a-la-carte' 
                              ? 'text-white/90' 
                              : isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {selectedPkg?.categoryId === 'a-la-carte'
                              ? `₹${(financialData.baseAmount || aLaCarteBudget || 15000).toLocaleString('en-IN')}`
                              : 'from ₹2,500'}
                          </div>
                        </button>

                        {/* 9. CUSTOMIZE PACKAGE Tile */}
                        <button
                          type="button"
                          onClick={handleSelectCustomPackageCategory}
                          className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                            selectedPkg?.categoryId === 'custom-package'
                              ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md ring-2 ring-[#11b1d0]/30'
                              : isDark
                                ? 'bg-[#131b2c] border-slate-700 text-slate-200 hover:border-[#11b1d0] hover:bg-[#1a253c] hover:text-white'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-[#11b1d0] hover:bg-slate-50 hover:text-slate-950 shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="leading-tight font-extrabold">CUSTOM PACKAGE</div>
                            <Sliders className="w-3.5 h-3.5 opacity-80" />
                          </div>
                          <div className={`text-[10px] mt-1 font-medium ${
                            selectedPkg?.categoryId === 'custom-package' || selectedPkg?.isCustom
                              ? 'text-white/90' 
                              : isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {selectedPkg?.isCustom && selectedPkg?.userBudget
                              ? `₹${Number(selectedPkg.userBudget).toLocaleString('en-IN')}`
                              : `Customize ${currentCategoryForCustom?.title || 'Scope'}`}
                          </div>
                        </button>
                      </div>

                      {/* Sub-panel below category buttons */}
                      {selectedPkg?.categoryId === 'a-la-carte' ? (
                        /* Interactive À La Carte Builder (Strictly Single Service Selection) */
                        <div className={`pt-3 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#11b1d0]" />
                              <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Select 1 À La Carte Service (Single Selection):
                              </span>
                            </div>
                            <span className="text-[10px] text-[#11b1d0] font-semibold">
                              Selected: {selectedALaCarteItem?.name}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                            {A_LA_CARTE_SERVICES.map((item) => {
                              const isSelected = selectedALaCarteItem?.id === item.id || selectedALaCarteItem?.name === item.name;
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => handleSelectALaCarteItem(item)}
                                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                                    isSelected
                                      ? isDark
                                        ? 'bg-[#11b1d0]/20 border-[#11b1d0] text-white shadow-sm ring-1 ring-[#11b1d0]/50'
                                        : 'bg-cyan-50 border-[#11b1d0] text-slate-900 shadow-sm ring-1 ring-[#11b1d0]/40'
                                      : isDark
                                        ? 'bg-[#131b2c] border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-[#1a253c]'
                                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="mt-0.5 flex-shrink-0">
                                    {isSelected ? (
                                      <CheckCircle2 className="w-4 h-4 text-[#11b1d0] fill-[#11b1d0]/20" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-400" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold flex items-center justify-between gap-1">
                                      <span className="truncate">{item.name}</span>
                                      <span className="text-[10px] font-semibold text-[#11b1d0] whitespace-nowrap">
                                        ₹{item.price?.toLocaleString('en-IN')}
                                      </span>
                                    </div>
                                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                                      {item.desc}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Custom Deliverable Adder */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={customALaCarteInput}
                              onChange={(e) => setCustomALaCarteInput(e.target.value)}
                              placeholder="Add custom single service (e.g. 3D Product Mockup)..."
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomALaCarteItem(); } }}
                              className={`flex-1 px-3 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-[#11b1d0] ${
                                isDark ? 'bg-[#0c121e] border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={handleAddCustomALaCarteItem}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#11b1d0] text-white hover:bg-[#0ea5c2] cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Select Custom</span>
                            </button>
                          </div>

                          {/* Agreed Deliverables Budget Input & Presets */}
                          <div className={`p-2.5 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
                            isDark ? 'bg-[#0c121e] border-slate-800' : 'bg-white border-slate-200'
                          }`}>
                            <div>
                              <label className="text-[11px] font-bold block text-slate-400">
                                Agreed Base Price (₹ without GST):
                              </label>
                              <div className="flex items-center gap-1.5 mt-1">
                                {[2500, 5000, 8000, 10000, 15000, 25000].map(amt => (
                                  <button
                                    key={amt}
                                    type="button"
                                    onClick={() => handleUpdateALaCarteBudget(amt)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                      aLaCarteBudget === amt
                                        ? 'bg-[#11b1d0] text-white'
                                        : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                  >
                                    ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="w-full sm:w-44">
                              <div className="relative">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                                <input
                                  type="number"
                                  value={aLaCarteBudget}
                                  onChange={(e) => handleUpdateALaCarteBudget(e.target.value)}
                                  className={`w-full pl-6 pr-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none focus:ring-1 focus:ring-[#11b1d0] ${
                                    isDark ? 'bg-[#131b2c] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (selectedPkg?.categoryId === 'custom-package' || selectedPkg?.isCustom) ? (
                        /* Custom Package Active Summary & Drawer Trigger */
                        <div className={`pt-3 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-1.5">
                              <Sliders className="w-4 h-4 text-[#11b1d0]" />
                              <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                Custom Package: {selectedPkg?.categoryTitle || currentCategoryForCustom?.title} ({selectedPkg?.tierName || 'Custom Scope'})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleOpenCustomPackageDrawer}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#11b1d0] text-white hover:bg-[#0ea5c2] cursor-pointer flex items-center gap-1.5 shadow-sm transition-all"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                              <span>Open Custom Builder Sidebar</span>
                            </button>
                          </div>

                          <div className={`p-3 rounded-xl border text-xs space-y-2 ${
                            isDark ? 'bg-[#0c121e] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                          }`}>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div>
                                <span className="font-extrabold text-sm text-[#11b1d0]">
                                  {selectedPkg?.activeDetails?.length || 0} Custom Deliverables Included
                                </span>
                                <div className="text-[11px] text-slate-400 mt-0.5">
                                  Scope initialized for <strong>{currentCategoryForCustom?.title}</strong>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Price:</span>
                                <span className="font-black text-sm text-slate-900 dark:text-white">
                                  ₹{Number(selectedPkg?.userBudget || financialData.baseAmount || 35000).toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>

                            {selectedPkg?.activeDetails && selectedPkg.activeDetails.length > 0 && (
                              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                                {selectedPkg.activeDetails.map((detail, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold ${
                                      isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'
                                    }`}
                                  >
                                    <Check className="w-2.5 h-2.5 mr-1 text-[#11b1d0]" />
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Standard Category Tier Switcher */
                        (() => {
                          const currentCat = packagesData.find(c => c.id === selectedPkg?.categoryId) || packagesData[0];
                          return (
                            <div className={`pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  Select Tier for {currentCat.title}:
                                </span>
                                <button
                                  type="button"
                                  onClick={handleOpenCustomPackageDrawer}
                                  className="text-[10.5px] font-extrabold text-[#11b1d0] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Sliders className="w-3 h-3" />
                                  <span>Customize this {currentCat.title} Plan</span>
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {currentCat.tiers.filter(t => t.id !== 'custom').map((tier) => {
                                  const isTierSelected = selectedPkg?.tierId === tier.id;
                                  return (
                                    <button
                                      key={tier.id}
                                      type="button"
                                      onClick={() => handleSwitchPackage(currentCat, tier, selectedPkg?.billingCycle || 'monthly')}
                                      className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                                        isTierSelected
                                          ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md'
                                          : isDark
                                            ? 'bg-[#131b2c] border-slate-700 text-slate-300 hover:border-[#11b1d0] hover:bg-[#1a253c] hover:text-white'
                                            : 'bg-white border-slate-300 text-slate-700 hover:border-[#11b1d0] hover:bg-slate-50 hover:text-slate-950 shadow-xs'
                                      }`}
                                    >
                                      {tier.name}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()
                      )}
                    </div>
                  )}
                </div>

                <div className={`mt-3 pt-3 border-t flex items-center justify-between ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Proforma Invoice Ref: <strong className="text-[#11b1d0]">{docCode}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveView('preview')}
                    className="text-xs font-extrabold text-[#11b1d0] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>View Proforma Invoice Preview</span>
                    <ArrowLeft className="w-3 h-3 rotate-180" />
                  </button>
                </div>
              </div>

              {/* Client & Advertiser Form */}
              <form onSubmit={(e) => { e.preventDefault(); setActiveView('preview'); }} className="space-y-4">
                {/* EXISTING CLIENT / RENEWAL / UPSELL SELECTION CARD */}
                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#11b1d0]" />
                      <span className={`text-xs font-black uppercase tracking-wider ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        Client Selection & Transaction Mode:
                      </span>
                    </div>

                    {/* Mode Buttons: New Client vs Existing Client */}
                    <div className={`inline-flex items-center p-0.5 rounded-lg border ${
                      isDark ? 'bg-[#090d16] border-slate-700' : 'bg-white border-slate-200 shadow-xs'
                    }`}>
                      <button
                        type="button"
                        onClick={() => {
                          setClientMode('new');
                          setSelectedClient(null);
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          clientMode === 'new'
                            ? 'bg-[#11b1d0] text-white shadow-xs'
                            : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>New Client / Manual</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setClientMode('existing')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          clientMode === 'existing'
                            ? 'bg-[#11b1d0] text-white shadow-xs'
                            : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Existing Client</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-black">
                          Renewal / Upsell
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* If Existing Client mode active */}
                  {clientMode === 'existing' && (
                    <div className="space-y-3 pt-2 border-t border-slate-700/50 dark:border-slate-800">
                      {!selectedClient ? (
                        <div className="relative">
                          <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={clientSearchQuery}
                              onChange={(e) => setClientSearchQuery(e.target.value)}
                              placeholder="Search existing client by company name, contact, phone, or email..."
                              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                                isDark ? 'bg-[#090d16] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                              }`}
                            />
                          </div>

                          {/* Autocomplete list of matching clients */}
                          <div className={`mt-1.5 max-h-48 overflow-y-auto rounded-xl border shadow-lg divide-y ${
                            isDark ? 'bg-[#0f172a] border-slate-700 divide-slate-800' : 'bg-white border-slate-200 divide-slate-100'
                          }`}>
                            {filteredClients.length > 0 ? (
                              filteredClients.map((c, idx) => (
                                <button
                                  key={c.id || idx}
                                  type="button"
                                  onClick={() => handleSelectExistingClient(c)}
                                  className={`w-full p-2.5 text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                                    isDark ? 'hover:bg-slate-800/80 text-white' : 'hover:bg-slate-50 text-slate-900'
                                  }`}
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-black truncate flex items-center gap-2">
                                      <span>{c.companyName || c.name || 'Unnamed Client'}</span>
                                      {c.name && c.companyName && (
                                        <span className="text-[10px] font-normal text-slate-400">({c.name})</span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 truncate flex items-center gap-3 mt-0.5">
                                      {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {c.phone}</span>}
                                      {c.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {c.email}</span>}
                                      {c.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {c.city}</span>}
                                    </div>
                                  </div>
                                  {c.currentPlan && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 whitespace-nowrap">
                                      {c.currentPlan}
                                    </span>
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="p-3 text-center text-xs text-slate-400">
                                {isLoadingClients ? (
                                  <div className="flex items-center justify-center gap-2 py-1 text-[#11b1d0]">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span className="font-semibold">Loading clients from CRM database...</span>
                                  </div>
                                ) : clientSearchQuery.trim() ? (
                                  'No matching clients found.'
                                ) : (
                                  'No existing clients found in CRM database.'
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Selected Client Preview Card + Purpose Chips */
                        <div className={`p-3 rounded-xl border flex flex-col gap-2.5 ${
                          isDark ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-cyan-50/70 border-cyan-200'
                        }`}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xs font-black text-cyan-500 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>SELECTED EXISTING CLIENT:</span>
                              </div>
                              <div className={`text-sm font-black mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {selectedClient.companyName || selectedClient.name}
                              </div>
                              <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1 mt-1">
                                {selectedClient.name && <span><strong>Contact:</strong> {selectedClient.name} ({selectedClient.designation})</span>}
                                {selectedClient.phone && <span><strong>Phone:</strong> {selectedClient.phone}</span>}
                                {selectedClient.email && <span><strong>Email:</strong> {selectedClient.email}</span>}
                                {selectedClient.currentPlan && (
                                  <span className="text-emerald-500 font-semibold">
                                    <strong>Current Plan:</strong> {selectedClient.currentPlan}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedClient(null)}
                              className="text-[11px] font-bold text-red-400 hover:text-red-500 hover:underline px-2 py-1 rounded-lg border border-red-500/30 cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              <span>Change Client</span>
                            </button>
                          </div>

                          {/* Transaction Purpose: Renewal vs Upsell vs New Sale */}
                          <div className="pt-2 border-t border-cyan-500/20 flex items-center gap-2 flex-wrap">
                            <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Transaction Purpose:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleSetSaleType('renewal')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                                  saleType === 'renewal'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Plan Renewal</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSetSaleType('upsell')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                                  saleType === 'upsell'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <TrendingUp className="w-3 h-3" />
                                <span>Upsell / Expansion</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSetSaleType('new_service')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                                  saleType === 'new_service'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <Package className="w-3 h-3" />
                                <span>New Service Sale</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-xs font-extrabold uppercase tracking-wider text-[#11b1d0]">
                  Advertiser & Billing Details (For Proforma Invoice)
                </div>

                {/* Row 1: Company Name / Advertiser Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Advertiser / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Global Corp"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Contact Person & Designation *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rohan Varma"
                        className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                          isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                        }`}
                      />
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="Director"
                        className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                          isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Official Work Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Official Work Email (For PI Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rohan@apex.com"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 99109 92774"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 3: Billing Address */}
                <div>
                  <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Billing Address (Street / Office Address)
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 402, DLF Tower B, Jasola"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                      isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                    }`}
                  />
                </div>

                {/* Row 4: City, State, PIN Code */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Delhi"
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Delhi"
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      placeholder="110025"
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 5: GSTIN NO & Preferred Payment Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      GSTIN NO (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                      placeholder="07AAAAA0000A1Z5"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Preferred Mode of Payment
                    </label>
                    <select
                      value={formData.paymentMode}
                      onChange={(e) => {
                        const newMode = e.target.value;
                        setFormData((prev) => {
                          const isZeroGstMode = newMode === 'm-upi' || newMode === 'm-cash';
                          return {
                            ...prev,
                            paymentMode: newMode,
                            gstRate: isZeroGstMode ? 0 : prev.gstRate
                          };
                        });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] cursor-pointer ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                      }`}
                    >
                      <option value="NEFT/RTGS">NEFT/RTGS</option>
                      <option value="cheque">cheque</option>
                      <option value="p-upi">p-upi</option>
                      <option value="p-cash">p-cash</option>
                      <option value="creadit/debit">creadit/debit</option>
                      <option value="m-upi">m-upi</option>
                      <option value="m-cash">m-cash</option>
                    </select>
                  </div>
                </div>

                {/* Section: Payment Terms & Collection Status */}
                <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-[#0c121e] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#11b1d0] mb-3 flex items-center justify-between flex-wrap gap-2">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#11b1d0]" />
                      <span>Payment Collection Status & Advance Details</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Live PI Financial Sync
                    </span>
                  </div>

                  {/* Special Discount / Offer Input */}
                  <div className="mb-4 p-3.5 rounded-xl border border-dashed transition-all bg-[#11b1d0]/5 border-[#11b1d0]/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <label className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        <Tag className="w-3.5 h-3.5 text-[#11b1d0]" />
                        <span>Special Discount / Offer (₹ or %)</span>
                      </label>
                      
                      {/* Quick Percentage Presets */}
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[10px] text-slate-400 font-bold mr-1">Presets:</span>
                        {['5%', '10%', '15%', '20%'].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setFormData({ ...formData, discountAmount: pct })}
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                              formData.discountAmount === pct
                                ? 'bg-[#11b1d0] text-white shadow-xs'
                                : isDark
                                  ? 'bg-slate-800 text-slate-300 hover:bg-[#11b1d0]/20 hover:text-[#11b1d0]'
                                  : 'bg-slate-200 text-slate-700 hover:bg-[#11b1d0]/20 hover:text-[#11b1d0]'
                            }`}
                          >
                            {pct}
                          </button>
                        ))}
                        {formData.discountAmount && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, discountAmount: '' })}
                            className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.discountAmount}
                          onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                          placeholder="e.g. 5000 or 10%"
                          className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                            isDark ? 'bg-[#131b2c] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                          }`}
                        />
                      </div>

                      <div className="text-[11px] font-medium text-slate-400">
                        {financialData.discountAmount > 0 ? (
                          <span className="text-emerald-500 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 stroke-[3] flex-shrink-0" />
                            <span>
                              Saved: <strong>-₹{formatINR(financialData.discountAmount)}</strong> (Taxable Base: ₹{formatINR(financialData.baseAmount)})
                            </span>
                          </span>
                        ) : (
                          <span>Enter fixed ₹ amount (e.g. 5000) or percentage (e.g. 10%)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* GST Selection Dropdown */}
                    <div>
                      <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        GST Rate (%) *
                      </label>
                      <select
                        value={formData.gstRate}
                        onChange={(e) => setFormData({ ...formData, gstRate: Number(e.target.value) })}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] cursor-pointer ${
                          isDark ? 'bg-[#131b2c] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                        }`}
                      >
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="18">18%</option>
                        <option value="40">40%</option>
                      </select>
                    </div>

                    {/* Payment Status Dropdown */}
                    <div>
                      <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Payment Status *
                      </label>
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) => {
                          const status = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            paymentStatus: status,
                            receivedAmount: status === 'Partial Received' ? (prev.receivedAmount || Math.round(financialData.totalAmount * 0.5)) : '',
                          }));
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] cursor-pointer ${
                          isDark ? 'bg-[#131b2c] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                        }`}
                      >
                        <option value="Full Payment Pending">Full Payment Pending</option>
                        <option value="Partial Received">Partial Received</option>
                        <option value="Full Payment Received">Full Payment Received</option>
                      </select>
                    </div>

                    {/* Conditional: If Partial Received, ask how much received */}
                    {formData.paymentStatus === 'Partial Received' ? (
                      <div className="animate-fadeIn">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#11b1d0]">
                            Partial Amount Received (₹) *
                          </label>
                          {/* Quick 50% Preset Chip */}
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, receivedAmount: Math.round(financialData.totalAmount * 0.5) })}
                            className="text-[10px] font-black px-2 py-0.5 rounded bg-[#11b1d0]/15 text-[#11b1d0] hover:bg-[#11b1d0] hover:text-white transition-colors cursor-pointer"
                          >
                            Set 50% (₹{formatINR(Math.round(financialData.totalAmount * 0.5))})
                          </button>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="1"
                            max={financialData.totalAmount}
                            required
                            value={formData.receivedAmount}
                            onChange={(e) => setFormData({ ...formData, receivedAmount: e.target.value })}
                            placeholder="Enter amount received"
                            className={`w-full pl-8 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-[#11b1d0] focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                              isDark ? 'bg-[#131b2c] text-white' : 'bg-white text-slate-900'
                            }`}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1 px-1">
                          <span>Total: ₹{formatINR(financialData.totalAmount)}</span>
                          <span className="text-amber-500 font-bold">
                            Balance: ₹{formatINR(financialData.balanceAmount)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* If Full Payment Pending or Full Received */
                      <div className="flex flex-col justify-center">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider mb-1 text-slate-400">
                          Balance Overview
                        </span>
                        <div className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-between ${
                          formData.paymentStatus === 'Full Payment Received'
                            ? isDark
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                            : isDark
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        }`}>
                          <span>
                            {formData.paymentStatus === 'Full Payment Received' ? '100% Paid (Zero Balance)' : 'Pending Advance'}
                          </span>
                          <span className="font-black">
                            {formData.paymentStatus === 'Full Payment Received'
                              ? `₹${formatINR(financialData.totalAmount)} Paid`
                              : `₹${formatINR(financialData.totalAmount)} Due`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client Remark Input Box */}
                <div>
                  <label className={`block text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Client Remark
                  </label>
                  <input
                    type="text"
                    value={formData.clientRemark}
                    onChange={(e) => setFormData({ ...formData, clientRemark: e.target.value })}
                    placeholder="Enter any client remark, special request, or instructions"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                      isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                    }`}
                  />
                </div>

                {/* Submit & Next Step Buttons */}
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium mb-3">
                    {submitError}
                  </div>
                )}
                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-[#11b1d0] hover:bg-[#0fa1be] text-white shadow-xl shadow-[#11b1d0]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <span>Generate & Preview Proforma Invoice (PI)</span>
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ========================================================================= */
            /* VIEW 2: LIVE 2-PAGE PROFORMA INVOICE (PI) DOCUMENT SHEET                  */
            /* ========================================================================= */
            <div className="space-y-4 sm:space-y-6">
              {/* Document Notification Strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[#11b1d0]/10 border border-[#11b1d0]/30 text-xs font-semibold gap-2.5">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#11b1d0] flex-shrink-0" />
                  <span className={`${isDark ? 'text-slate-200' : 'text-slate-800'} text-[11px] sm:text-xs`}>
                    Official Stamped PI • Ref: <strong>{docCode}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 flex-wrap">
                  {/* Terms & Conditions Toggle */}
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-[10.5px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-2xs hover:border-[#11b1d0] transition-colors">
                    <input
                      type="checkbox"
                      checked={includeTerms}
                      onChange={(e) => setIncludeTerms(e.target.checked)}
                      className="rounded text-[#11b1d0] focus:ring-[#11b1d0] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>Terms & Conditions (Page 2)</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setActiveView('form')}
                    className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 hover:bg-[#11b1d0] hover:text-white text-[10.5px] sm:text-[11px] font-extrabold text-[#11b1d0] transition-colors"
                  >
                    Edit Client Info
                  </button>
                </div>
              </div>

              {/* Mobile Quick Action Buttons (Visible only on mobile screens < 768px, never cropped) */}
              <div className="grid grid-cols-3 gap-2 md:hidden">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-2 rounded-xl text-[11px] font-extrabold text-white bg-[#11b1d0] hover:bg-[#0fa1be] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  title="Print or Save A4 PDF"
                >
                  <Printer className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Print PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-2.5 px-2 rounded-xl text-[11px] font-extrabold text-white bg-green-600 hover:bg-green-700 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  title="Share via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenGmailModal}
                  className="py-2.5 px-2 rounded-xl text-[11px] font-extrabold text-white bg-red-600 hover:bg-red-700 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  title="Send via Gmail"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Gmail</span>
                </button>
              </div>

              {/* Mobile View Mode / Zoom Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-extrabold uppercase">Zoom:</span>
                  <button
                    type="button"
                    onClick={() => { setZoomMode('fit'); setManualScale(null); }}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] sm:text-[11px] font-extrabold transition-all cursor-pointer ${
                      zoomMode === 'fit' && manualScale === null
                        ? 'bg-[#11b1d0] text-white shadow-xs'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    Fit Screen ({Math.round(autoScale * 100)}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setZoomMode('original'); setManualScale(1); }}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] sm:text-[11px] font-extrabold transition-all cursor-pointer ${
                      zoomMode === 'original' || manualScale === 1
                        ? 'bg-[#11b1d0] text-white shadow-xs'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    100% Actual Size
                  </button>
                </div>

                <div className="flex items-center gap-1 ml-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setZoomMode('custom');
                      setManualScale(prev => Math.max(0.25, Number(((prev ?? autoScale) - 0.05).toFixed(2))));
                    }}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 min-w-[36px] text-center select-none">
                    {Math.round(currentScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setZoomMode('custom');
                      setManualScale(prev => Math.min(1.5, Number(((prev ?? autoScale) + 0.05).toFixed(2))));
                    }}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Printable Document Container (Exact CRM 2-Page Styling) */}
              <div 
                ref={previewContainerRef}
                className="overflow-x-auto pb-4 flex justify-center w-full"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div
                  style={{
                    width: currentScale < 1 ? `${Math.round(800 * currentScale)}px` : 'auto',
                    height: currentScale < 1 && docHeight > 0 ? `${Math.round(docHeight * currentScale)}px` : 'auto',
                    overflow: currentScale < 1 ? 'hidden' : 'visible',
                    transition: 'width 0.15s ease, height 0.15s ease'
                  }}
                >
                  <div 
                    ref={printRef}
                    className="w-[800px] min-w-[800px] max-w-[800px] bg-white text-slate-900 shadow-2xl rounded-sm p-6 sm:p-10 border border-slate-300 font-sans"
                    style={{ 
                      color: '#0f172a',
                      transform: currentScale < 1 ? `scale(${currentScale})` : 'none',
                      transformOrigin: 'top left'
                    }}
                  >
                  {/* ========================================================================= */}
                  {/* PAGE 1: PROFORMA INVOICE & ORDER SPECIFICATIONS                           */}
                  {/* ========================================================================= */}
                  <div className="page-container page-1 page-break relative space-y-2 flex flex-col justify-between min-h-[960px]">
                    {/* SECTION 1: TOP HEADER & ADVERTISER DETAILS */}
                    <div className="space-y-2.5">
                      {/* Top Dot Grids & Center Logo */}
                      <div className="flex justify-between items-center">
                          {/* Left Dot Grid */}
                          <div className="grid grid-cols-5 gap-1.5 p-0.5">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#00adc8] inline-block" />
                            ))}
                          </div>

                          {/* Center Logo */}
                          <div className="text-center px-4">
                            <img 
                              src={logoBlack} 
                              alt="Prittal Logo" 
                              className="h-10 sm:h-11 w-auto object-contain mx-auto" 
                            />
                          </div>

                          {/* Right Dot Grid */}
                          <div className="grid grid-cols-5 gap-1.5 p-0.5">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#00adc8] inline-block" />
                            ))}
                          </div>
                        </div>

                        {/* Sub-Header Bar: GSTIN & Invoice No */}
                        <div className="flex justify-between items-end border-b-2 border-[#00adc8] pb-1 text-[12px] font-semibold">
                          <div>
                            <span className="text-[#00adc8] font-bold">GSTIN NO : </span>
                            <span className="text-slate-800">{AGENCY_DETAILS.gstin}</span>
                          </div>
                          <div className="text-right">
                            <div>
                              <span className="text-[#00adc8] font-bold">PERFORMA INVOICE NO: </span>
                              <span className="text-slate-800 border-b border-slate-400 px-1 font-semibold">{docCode}</span>
                            </div>
                            <div className="mt-0.5">
                              <span className="text-[#00adc8] font-bold">Date: </span>
                              <span className="text-slate-800 font-semibold">{invoiceDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Company's Details (Underline Form Style) */}
                        <div className="space-y-1.5 text-[12px]">
                          <div className="flex items-center">
                            <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">Company Name:</span>
                            <span className="flex-1 border-b border-slate-400 px-1 font-semibold text-slate-900 min-h-[18px]">
                              {clientDisplayName}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">Address:</span>
                            <span className="flex-1 border-b border-slate-400 px-1 font-normal text-slate-800 min-h-[18px]">
                              {clientFullAddress || 'As per client registration record'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="flex items-center">
                              <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">Pin Code:</span>
                              <span className="flex-1 border-b border-slate-400 px-1 font-normal text-slate-800 min-h-[18px]">{formData.pinCode || '-'}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">Mobile No:</span>
                              <span className="flex-1 border-b border-slate-400 px-1 font-normal text-slate-800 min-h-[18px]">{formData.phone || '-'}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">Email Id:</span>
                              <span className="flex-1 border-b border-slate-400 px-1 font-normal text-slate-800 min-h-[18px]">{formData.email || '-'}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="flex items-center">
                              <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">GST NO :</span>
                              <span className="flex-1 border-b border-slate-400 px-1 font-normal text-slate-800 min-h-[18px]">{formData.gstin || 'Unregistered'}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold text-slate-700 whitespace-nowrap mr-2">City/State :</span>
                              <span className="flex-1 border-b border-slate-400 px-1 font-normal text-slate-800 min-h-[18px]">{[formData.city, formData.state].filter(Boolean).join(' / ') || 'Delhi / India'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SECTION 2: SERVICES DETAILS & SERVICE BRIEF */}
                      <div className="space-y-2 my-1.5">
                        {/* SERVICES DETAILS Section (Compact & Inline Services Display) */}
                        <div>
                          <div className="flex border border-[#00adc8] rounded-lg overflow-hidden shadow-xs bg-white">
                            {/* Left Vertical Badge */}
                            <div className="w-12 sm:w-14 bg-[#00adc8] text-white flex flex-col items-center justify-center p-2 flex-shrink-0 text-center select-none">
                              <Layers className="w-4 h-4 mb-1 text-white stroke-[2.5]" />
                              <span className="text-[9px] font-bold tracking-wider leading-none uppercase">SERVICES</span>
                              <span className="text-[9px] font-bold tracking-wider leading-none uppercase mt-0.5">DETAILS</span>
                            </div>

                            {/* Right Content Area: Compact & Inline */}
                            <div className="flex-1 p-2.5 sm:p-3 bg-white space-y-2">
                              {/* Top Sub-Bar: Selected Plan & Service Count */}
                              <div className="flex items-center justify-between flex-wrap gap-1.5 pb-1 border-b border-[#00adc8]/25">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs sm:text-[12.5px] font-bold text-slate-900">
                                    {selectedPkg?.categoryTitle || 'Digital Creative Retainer'} — {selectedPkg?.tierName || 'Standard'} Plan
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded text-[7.5px] sm:text-[8px] font-bold bg-[#00adc8] text-white uppercase tracking-wider">
                                    {selectedPkg?.billingCycle === 'annual' ? 'Annual Plan' : selectedPkg?.billingCycle === 'one-time' ? 'One-Time Project' : 'Monthly Retainer'}
                                  </span>
                                </div>
                                <div className="text-[9px] sm:text-[9.5px] font-semibold text-[#008ba3] flex items-center gap-1">
                                  <Check className="w-3 h-3 text-[#008ba3]" />
                                  <span>{activeSoldServices.length} Selected Services Active</span>
                                </div>
                              </div>

                              {/* Selected Services Scope: Shown IN LINE */}
                              <div className="flex items-start gap-1.5 text-[9px] leading-tight flex-wrap sm:flex-nowrap">
                                <span className="font-bold text-[#00adc8] uppercase tracking-wider text-[8.5px] whitespace-nowrap pt-0.5">
                                  Selected Services Scope:
                                </span>
                                <div className="flex flex-wrap gap-1 flex-1">
                                  {activeSoldServices.length > 0 ? (
                                    activeSoldServices.map((svc, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 bg-[#f0fdfa] border border-[#00adc8]/40 text-slate-900 px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-medium shadow-2xs"
                                      >
                                        <Check className="w-2.5 h-2.5 text-[#00adc8] stroke-[3.5] flex-shrink-0" />
                                        {svc}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-slate-500 italic text-[8.5px]">Full Scope Retainer committed as per plan specifications.</span>
                                  )}
                                </div>
                              </div>

                              {/* Plan Details & Scope Deliverables: Shown IN LINE */}
                              <div className="bg-slate-50 p-2 sm:p-2.5 rounded-lg border border-slate-200 text-[9px] sm:text-[9.5px] text-slate-700 leading-snug space-y-1">
                                <div>
                                  <strong className="font-semibold text-slate-900">Scope Deliverables:</strong>{' '}
                                  {getDeliverablesSummary(selectedPkg)}
                                </div>
                                {planFeaturesList.length > 0 && (
                                  <div className="text-slate-600 leading-snug mt-0.5">
                                    <strong className="font-semibold text-[#00adc8]">Included In Plan:</strong>{' '}
                                    {planFeaturesList.join('   •   ')}
                                  </div>
                                )}
                                {selectedAddons.length > 0 && (
                                  <div className="text-slate-600 leading-snug mt-0.5">
                                    <strong className="font-semibold text-slate-700">Selected Add-ons:</strong>{' '}
                                    {selectedAddons.map(a => `${a.name} (₹${formatINR(a.price)})`).join(' • ')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CUSTOMIZED PACKAGES / SERVICE BRIEF */}
                        <div className="border-b border-slate-300 pb-1.5">
                          <div className="flex items-center text-[11px] font-bold text-[#00adc8] mb-1">
                            <span className="tracking-wide">CUSTOMIZED PACKAGES / SERVICE BRIEF :</span>
                            <div className="flex-1 border-b border-[#00adc8] ml-2" />
                          </div>

                          {/* Line 1: Package Plan Details */}
                          <div className="text-[10.5px] sm:text-[11px] text-slate-800 flex items-center flex-wrap gap-1.5 mb-1">
                            <span>Commercial Retainer: <strong className="font-semibold text-slate-900">{selectedPkg?.categoryTitle || 'Digital Creative Retainer'}</strong> — {selectedPkg?.tierName || 'Standard'}</span>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase bg-[#00adc8]/10 text-[#00adc8]">
                              {selectedPkg?.billingCycle === 'annual' ? 'Annual Plan' : selectedPkg?.billingCycle === 'one-time' ? 'One-Time Project' : 'Monthly Retainer'}
                            </span>
                          </div>

                          {/* Client Remark Display */}
                          <div className="text-[8.5px] sm:text-[9px] text-slate-700 leading-snug font-normal bg-[#f0fdfa] p-1.5 rounded-md border border-[#00adc8]/30 mb-1">
                            <strong className="font-semibold text-[#008ba3]">Client Remark:</strong> {formData.clientRemark?.trim() || 'No special remarks recorded (Standard SLA execution)'}
                          </div>

                          {/* Execution Notes & Briefing Terms */}
                          <div className="text-[8.5px] sm:text-[9px] text-slate-600 leading-snug font-normal bg-slate-50 p-1.5 rounded-md border border-slate-200">
                            <strong className="font-semibold text-slate-800">Execution Terms:</strong> Production onboarding, creative briefing, and asset deployment commence immediately upon clearance of advance payment and brief sign-off. All deliverables specified above will be executed in accordance with Prittal's commercial service standards.
                          </div>
                        </div>
                      </div>

                      {/* SECTION 3: MODE OF PAYMENT, PARTICULARS, BANK & DIGITAL AUTH */}
                      <div className="space-y-2">
                        {/* Lower Section: Two Columns (Payment & Acknowledgements vs Amounts & Bank) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Left: Mode of Payment & Acknowledgements */}
                          <div className="space-y-2">
                            {/* Mode of Payment Badge */}
                            <div className="space-y-1.5">
                              <div className="inline-block bg-[#00adc8] text-white px-2 py-0.5 rounded text-[9.5px] font-bold tracking-wider uppercase mb-0.5">
                                MODE OF PAYMENT
                              </div>
                              <div className="text-[10px] font-normal text-slate-600 mb-1">
                                A/C Payee cheque / RTGS / NEFT / IMPS / UPI / Card
                              </div>
                              <div className="flex items-center text-[10.5px] mt-1">
                                <span className="font-medium text-slate-700 mr-1.5">Selected Mode:</span>
                                <span className="font-semibold text-[#00adc8] border-b border-slate-400 flex-1 px-1 min-h-[16px]">
                                  {formData.paymentMode}
                                </span>
                              </div>
                              <div className="flex items-center text-[10.5px] mt-1">
                                <span className="font-medium text-slate-700 mr-1.5">Payment Status:</span>
                                <span className={`font-semibold border-b border-slate-400 flex-1 px-1 min-h-[16px] ${
                                  financialData.balanceAmount === 0 ? 'text-emerald-700' : 'text-[#00adc8]'
                                }`}>
                                  {formData.paymentStatus}
                                  {formData.paymentStatus === 'Partial Received' && ` (₹${formatINR(financialData.receivedAmount)} Advance)`}
                                </span>
                              </div>
                              <div className="flex items-center text-[10.5px] mt-1">
                                <span className="font-medium text-slate-700 mr-1.5">Drawn in Favour of PRITTAL:</span>
                                <span className="font-semibold text-slate-800 border-b border-slate-400 flex-1 px-1 min-h-[16px]">
                                  Rupees ₹{formatINR(financialData.receivedAmount > 0 ? financialData.receivedAmount : financialData.totalAmount)}
                                </span>
                              </div>
                            </div>

                            {/* Company Acknowledges Badge */}
                            <div className="mt-3">
                              <div className="inline-block bg-[#00adc8] text-white px-2 py-0.5 rounded text-[9.5px] font-bold tracking-wider uppercase mb-0.5">
                                COMPANY ACKNOWLEDGES
                              </div>
                              <ul className="text-[8.5px] text-slate-600 space-y-0.5 pl-3 list-disc font-normal mt-0.5">
                                <li>Invoice details and terms have been read and accepted.</li>
                                <li>Services subject to formal sign-off and advance terms.</li>
                                <li>All disputes subject to Delhi jurisdiction only.</li>
                                <li>Standard GST rates apply as per prevailing Govt notifications.</li>
                              </ul>
                              <div className="mt-2.5 space-y-1.5 w-4/5">
                                <div className="flex items-center text-[11px]">
                                  <span className="font-medium text-slate-700 mr-1.5">Name:</span>
                                  <span className="font-bold text-slate-800 border-b border-slate-400 flex-1 px-1 pb-0.5 min-h-[16px]">
                                    {formData.name || 'Authorized Signatory'}
                                  </span>
                                </div>
                                {formData.designation && (
                                  <div className="flex items-center text-[11px]">
                                    <span className="font-medium text-slate-700 mr-1.5">Designation:</span>
                                    <span className="font-semibold text-slate-700 border-b border-slate-400 flex-1 px-1 pb-0.5 min-h-[16px]">
                                      {formData.designation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right: Particulars Table & Bank Details */}
                          <div className="space-y-2">
                            {/* Table */}
                            <div className="border border-[#00adc8] rounded-lg overflow-hidden">
                              <div className="bg-[#00adc8] text-white flex justify-between p-1.5 font-bold text-[11px]">
                                <span>PARTICULARS</span>
                                <span>AMOUNT (INR)</span>
                              </div>
                              <div className="divide-y divide-slate-200">
                                {financialData.discountAmount > 0 ? (
                                  <>
                                    <div className="flex justify-between px-2.5 py-1 text-[10.5px] font-normal text-slate-600">
                                      <span>Package Standard Price</span>
                                      <span className="font-semibold text-slate-700 line-through">₹{formatINR(financialData.originalBaseAmount)}</span>
                                    </div>
                                    <div className="flex justify-between px-2.5 py-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50/60">
                                      <span>Special Discount / Offer</span>
                                      <span>- ₹{formatINR(financialData.discountAmount)}</span>
                                    </div>
                                    <div className="flex justify-between px-2.5 py-1.5 text-[11px] font-semibold text-slate-800">
                                      <span>Net Taxable Base Amount</span>
                                      <span className="font-bold text-slate-900">₹{formatINR(financialData.baseAmount)}</span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex justify-between px-2.5 py-1.5 text-[11px] font-normal text-slate-700">
                                    <span>Taxable Base Amount</span>
                                    <span className="font-semibold text-slate-900">₹{formatINR(financialData.baseAmount)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between px-2.5 py-1.5 text-[11px] font-normal text-slate-700">
                                  <span>GST ( {financialData.gstRate}% )</span>
                                  <span className="font-semibold text-rose-600">+ ₹{formatINR(financialData.gstAmount)}</span>
                                </div>
                                <div className="flex justify-between px-2.5 py-1.5 text-[11px] font-bold bg-slate-50 text-[#00adc8]">
                                  <span>Total Amount (Incl. GST)</span>
                                  <span>₹{formatINR(financialData.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between px-2.5 py-1.5 text-[11px] font-normal text-slate-700">
                                  <span>Received Amount</span>
                                  <span className={financialData.receivedAmount > 0 ? "font-semibold text-emerald-600" : "font-normal text-slate-500"}>
                                    ₹{formatINR(financialData.receivedAmount)}
                                    {formData.paymentStatus === 'Partial Received' && (
                                      <span className="text-[9px] font-medium text-emerald-700 ml-1">(Advance)</span>
                                    )}
                                  </span>
                                </div>
                                <div className={`flex justify-between px-2.5 py-1.5 text-[11px] font-bold ${
                                  financialData.balanceAmount === 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
                                }`}>
                                  <span>Balance Amount</span>
                                  <span>₹{formatINR(financialData.balanceAmount)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Bank Details Beneficiary */}
                            <div className="border border-[#00adc8] rounded-lg p-2 bg-slate-50 text-[9.5px] space-y-1 mt-2">
                              <div className="inline-block bg-[#00adc8] text-white px-2 py-0.5 rounded text-[8.5px] font-bold tracking-wider uppercase mb-0.5">
                                BANK DETAILS (BENEFICIARY)
                              </div>
                              <div className="flex justify-between"><span className="font-medium text-slate-600">Name:</span> <span className="font-semibold text-slate-800">{AGENCY_DETAILS.bank.beneficiary}</span></div>
                              <div className="flex justify-between"><span className="font-medium text-slate-600">Account No:</span> <span className="font-mono font-semibold text-slate-800">{AGENCY_DETAILS.bank.accountNo}</span></div>
                              <div className="flex justify-between"><span className="font-medium text-slate-600">IFSC Code:</span> <span className="font-mono font-semibold text-slate-800">{AGENCY_DETAILS.bank.ifsc}</span></div>
                              <div className="flex justify-between"><span className="font-medium text-slate-600">Bank & Branch:</span> <span className="font-semibold text-slate-800">{AGENCY_DETAILS.bank.bankName}, {AGENCY_DETAILS.bank.branch}</span></div>
                            </div>
                          </div>
                        </div>

                        {/* Digital Validation & Electronic Authentication Bar (No physical signature or stamp required) */}
                        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200 text-[8px] sm:text-[8.5px] text-slate-700">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00adc8] flex-shrink-0" />
                            <span>
                              <strong className="font-semibold text-slate-900">Computer Generated Proforma Invoice:</strong> Authenticated and processed electronically for <strong>{clientDisplayName}</strong>. No physical signature or stamp is required.
                            </span>
                          </div>
                          <div className="flex items-center space-x-1.5 flex-shrink-0 pl-2">
                            <span className="text-[7.5px] font-bold text-[#00adc8] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#00adc8]/30">
                              Digitally Authorized
                            </span>
                          </div>
                        </div>
                      </div>

                    {/* Bottom Full-Width Cyan Ribbon Footer */}
                    <div className="page-bottom-ribbon bg-[#00adc8] text-white py-2 px-4 text-center text-[8.5px] font-semibold space-y-0.5 -mx-6 sm:-mx-6 rounded-none mt-auto">
                      <div>{AGENCY_DETAILS.name}</div>
                      <div className="text-[8px] font-normal text-white/90">
                        {AGENCY_DETAILS.address}   |   {AGENCY_DETAILS.website}   |   {AGENCY_DETAILS.email}   |   {AGENCY_DETAILS.phone}
                      </div>
                    </div>
                  </div>

                  {/* ========================================================================= */}
                  {/* PAGE 2: OFFICIAL TERMS & CONDITIONS (OPTIONAL / TOGGLEABLE)               */}
                  {/* ========================================================================= */}
                  {includeTerms && (
                    <div className="page-container page-2 pt-6 border-t-2 border-dashed border-slate-300 mt-8 relative print:border-t-0 print:mt-0 print:pt-4 space-y-3 flex flex-col justify-between min-h-[960px]">
                    {/* Header: Prittal Logo */}
                    <div className="text-center mb-4">
                      <img 
                        src={logoBlack} 
                        alt="Prittal Logo" 
                        className="h-12 sm:h-14 w-auto object-contain mx-auto" 
                      />
                    </div>

                    {/* TERMS & CONDITIONS Bar */}
                    <div className="flex items-center justify-center space-x-4 mb-2">
                      <div className="w-16 border-b-2 border-[#00adc8]" />
                      <span className="text-[13px] font-bold text-[#00adc8] uppercase tracking-widest">
                        TERMS & CONDITIONS
                      </span>
                      <div className="w-16 border-b-2 border-[#00adc8]" />
                    </div>
                    <p className="text-[10px] text-slate-500 text-center mb-5 font-normal">
                      By accepting this proforma invoice, the Company agrees to be bound by the following terms.
                    </p>

                    {/* Dual Column Layout (16 Numbered Sections) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[9.5px] sm:text-[10px] leading-relaxed text-slate-700 font-normal">
                      {/* Left Column: 1 to 8 */}
                      <div className="space-y-4">
                        {TERMS_AND_CONDITIONS.slice(0, 8).map((tc) => (
                          <div key={tc.num} className="space-y-1">
                            <div className="font-semibold text-[#00adc8] flex items-center space-x-1.5">
                              <span className="w-4 h-4 rounded-full bg-[#00adc8] text-white flex items-center justify-center text-[9px] font-bold">
                                {tc.num}
                              </span>
                              <span className="text-[10px]">{tc.title}</span>
                            </div>
                            <ul className="pl-5 list-disc space-y-1 text-slate-600 font-normal">
                              {tc.items.map((it, idx) => (
                                <li key={it}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Right Column: 9 to 16 */}
                      <div className="space-y-4">
                        {TERMS_AND_CONDITIONS.slice(8).map((tc) => (
                          <div key={tc.num} className="space-y-1">
                            <div className="font-semibold text-[#00adc8] flex items-center space-x-1.5">
                              <span className="w-4 h-4 rounded-full bg-[#00adc8] text-white flex items-center justify-center text-[9px] font-bold">
                                {tc.num}
                              </span>
                              <span className="text-[10px]">{tc.title}</span>
                            </div>
                            {tc.isTable ? (
                              <table className="border border-[#00adc8] rounded text-[9px] mt-1.5 w-full font-normal">
                                <thead className="bg-[#00adc8] text-white font-semibold">
                                  <tr>
                                    <th className="p-1 text-left">Service</th>
                                    <th className="p-1 text-left">Cancellation Policy</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-slate-600">
                                  {tc.tableRows.map((r, rIdx) => (
                                    <tr key={rIdx}>
                                      <td className="p-1 font-medium text-slate-800 whitespace-pre-line">{r.service}</td>
                                      <td className="p-1">{r.policy}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <ul className="pl-5 list-disc space-y-1 text-slate-600 font-normal">
                                {tc.items.map((it, idx) => (
                                  <li key={it}>{it}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Page 2 Bottom Registered Footer */}
                    <div className="page-bottom-footer text-center pt-4 mt-auto border-t border-slate-200 space-y-1 pb-4">
                      <div className="text-base font-bold text-slate-900">
                        Prittal<span className="text-[#00adc8]">.</span>
                      </div>
                      <div className="text-[10px] font-bold text-[#00adc8] uppercase">
                        {AGENCY_DETAILS.name}
                      </div>
                      <div className="text-[9px] text-slate-500 font-normal">
                        {AGENCY_DETAILS.address}   |   {AGENCY_DETAILS.website}
                      </div>
                    </div>
                  </div>
                )}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer for Preview Mode */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDark ? 'bg-[#131b2c] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setActiveView('form')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-[#11b1d0] hover:text-white transition-colors text-center cursor-pointer"
                >
                  ← Edit Client & Billing Details
                </button>

                <div className="grid grid-cols-1 sm:flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleOpenGmailModal}
                    className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span>Send via Gmail</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-xs font-extrabold text-white bg-green-600 hover:bg-green-700 shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>WhatsApp</span>
                  </button>

                  {/* Print / Save PDF Button */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-xs font-extrabold text-white bg-[#11b1d0] hover:bg-[#0fa1be] shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 flex-shrink-0" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendForApproval}
                    className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-xs font-extrabold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4 flex-shrink-0" />
                    <span>Send for Approval</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GMAIL DISPATCH MODAL DIALOG (MATCHING CRM SPECIFICATION)                  */}
      {/* ========================================================================= */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className={`max-w-md w-full rounded-2xl shadow-2xl border overflow-hidden transition-all transform scale-100 ${
              isDark ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'border-slate-800 bg-[#131d33]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight">Send Invoice via Gmail</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Ref: #{docCode}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(false)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Delivery Info Banner */}
              <div className={`p-3 rounded-xl border flex items-start space-x-3 text-xs ${
                isDark ? 'bg-red-950/20 border-red-900/40 text-red-300' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="p-1 rounded-md bg-red-600 text-white flex-shrink-0 mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="leading-snug">
                  <span className="font-bold block text-[11px] sm:text-xs">Open in Gmail Web</span>
                  <span className="text-[10px] sm:text-[11px] opacity-90">
                    Opens Gmail Web composer with recipient email, sales CC, subject, and commercial breakdown pre-filled.
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {emailModalData.error && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{emailModalData.error}</span>
                </div>
              )}

              {/* Client Email Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Client Recipient Email <span className="text-red-500">*</span>
                  </label>
                  {(formData.companyName || formData.name) && (
                    <span className="text-[10px] font-bold text-[#11b1d0] truncate max-w-[180px]">
                      {formData.companyName || formData.name}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={emailModalData.clientEmail}
                    onChange={(e) => setEmailModalData({ ...emailModalData, clientEmail: e.target.value, error: '' })}
                    placeholder="e.g. client@company.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                      emailModalData.error 
                        ? 'border-red-500 bg-red-500/5'
                        : isDark ? 'bg-[#131d33] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Sales CC Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Sales Proof CC
                  </label>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Counter-signed Copy
                  </span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={emailModalData.ccEmail}
                    onChange={(e) => setEmailModalData({ ...emailModalData, ccEmail: e.target.value })}
                    placeholder="sales@prittal.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                      isDark ? 'bg-[#131d33] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={emailModalData.subject}
                  onChange={(e) => setEmailModalData({ ...emailModalData, subject: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                    isDark ? 'bg-[#131d33] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Document PDF Attachment Info */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-[#131d33]/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center space-x-2 truncate mr-2">
                  <FileText className="w-4 h-4 text-[#11b1d0] flex-shrink-0" />
                  <div className="truncate">
                    <span className="font-bold block text-[11px]">{docCode}.pdf</span>
                    <span className="text-[9.5px] text-slate-400">Save PDF to attach in Gmail</span>
                  </div>
                </div>
                {/* Download / Print button removed */}
              </div>
            </div>

            {/* Modal Actions */}
            <div className={`p-4 border-t flex items-center justify-between gap-2.5 ${
              isDark ? 'border-slate-800 bg-[#131d33]' : 'border-slate-100 bg-slate-50'
            }`}>
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleConfirmSendGmail}
                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Gmail Web</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Interactive Custom Builder Drawer Sidebar (Opens initialized from the currently selected plan) */}
      <CustomBuilderDrawer
        isOpen={isCustomDrawerOpen}
        onClose={() => setIsCustomDrawerOpen(false)}
        category={currentCategoryForCustom}
        billingCycle={selectedPkg?.billingCycle || 'monthly'}
        onSelectTier={handleSelectCustomTier}
      />
    </div>
  );
};

export const ProjectModal = DocumentPreviewDrawer;
export default DocumentPreviewDrawer;
