const { API_BASE_URL } = require('../config/config');
const { getWebsiteID, fetchData } = require('../utils/helper');


exports.getcategories = async(req, res) => {  
    const websiteID = await getWebsiteID(); 
     const data = await fetchData(`${API_BASE_URL}/website/category/get-all-categories/${websiteID}`);
     return data || null
     
};


exports.getallproduct = async(category) => {  
    const websiteID = await getWebsiteID(); 
     const data = await fetchData(`${API_BASE_URL}/website/product-management/get-all-products/${websiteID}?categories=${category}`);
     
     return data || null
     
};

exports.getCategoryProducts = async (category) => {
    const websiteID = await getWebsiteID();
    const data = await fetchData(`${API_BASE_URL}/website/product-management/get-all-products/${websiteID}`);
    
    if (!data || data?.length===0) {
        return []; // Return null if no data or no products are found
    }

    // Filter products that match the provided category ID
    const filteredProducts = data?.filter(product => product.category._id === category);

    return filteredProducts;


};


exports.getsubCategory = async (category) => {
    const websiteID = await getWebsiteID();
    const data = await fetchData(`${API_BASE_URL}/website/sub-category/get-all-sub-categories/${websiteID}?categories=${category}`);
    
    return data;


};

exports.getsupersubCategory = async (category) => {
    const websiteID = await getWebsiteID();
    const data = await fetchData(`${API_BASE_URL}/website/super-sub-category/get-all-super-sub-categories/${websiteID}?categories=${category}`);
    
    return data;


};


