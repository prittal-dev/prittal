/**
 * CRM Integration Utility for PritTal Website (prittal2)
 * Connects website submissions, inquiries, and Proforma Invoices (PIs) directly to the deployed CRM backend.
 */

// Reads from .env (VITE_CRM_API_URL) or defaults to local dev / placeholder production
const rawUrl = (
  import.meta.env.VITE_CRM_API_URL || 
  'http://localhost:5000'
).trim().replace(/\/+$/, '');

// Strip trailing '/api' if present so subsequent `${CRM_BASE_URL}/api/...` calls never duplicate `/api/api`
export const CRM_BASE_URL = rawUrl.endsWith('/api') ? rawUrl.slice(0, -4) : rawUrl;

/**
 * Synchronize a generated Proforma Invoice / Package Order to the CRM backend
 * Adds the order as a Sales Contract, Client, Deal, and Lead in the CRM.
 * 
 * @param {Object} orderData
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const syncPackageOrderToCrm = async (orderData) => {
  try {
    const endpoint = `${CRM_BASE_URL}/api/sales/public/package-order`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[CRM Sync HTTP ${response.status}]:`, errText);
      return { success: false, error: errText };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (err) {
    console.warn('[CRM Sync Network Error]:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Synchronize a general contact / project inquiry into the CRM Leads pipeline
 * 
 * @param {Object} inquiryData
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const syncInquiryToCrm = async (inquiryData) => {
  try {
    const endpoint = `${CRM_BASE_URL}/api/sales/public/inquiry`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[CRM Inquiry HTTP ${response.status}]:`, errText);
      return { success: false, error: errText };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (err) {
    console.warn('[CRM Inquiry Network Error]:', err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Fetch existing active clients from CRM backend for client selection & upsell / renewal
 * 
 * @param {string} search
 * @returns {Promise<Array<any>>}
 */
export const fetchCrmClients = async (search = '') => {
  try {
    const qParam = search ? `?q=${encodeURIComponent(search)}` : '';
    const endpoint = `${CRM_BASE_URL}/api/sales/public/clients${qParam}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`[CRM Fetch Clients HTTP ${response.status}]`);
      return [];
    }

    const data = await response.json();
    return data.clients || data.data || [];
  } catch (err) {
    console.warn('[CRM Fetch Clients Network Error]:', err.message);
    return [];
  }
};
