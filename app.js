require('dotenv').config();  // Load environment variables from .env file
const { API_BASE_URL , WEBSITE_ID_KEY} = require('./config/config');
const { getWebsiteID } = require('./utils/helper');

const { getcategories ,getsupersubCategory, getallproduct , getCategoryProducts ,getsubCategory } = require('./controller/homecontroller');
const express = require('express');
const path = require('path');
const app = express();
const port = 3100;
const metaLogoPath = "assets/images/icon/metalogo.png";
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define the views directory

// Serve static files (like CSS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const categorylist = await getcategories();
    const seoDetails = {
            title: "",
            metaDescription: "",
            metaImage: `${baseUrl}/${metaLogoPath}`,
            keywords:" ",
            canonical:"",
    } 
   
   
    res.render('index', {body: "",baseUrl,categorylist,seoDetails});
});

app.get('/menucard/:id', async (req, res) => {
       
            const { id } = req.params;
    
            // Fetch categories
            const categorylist = await getcategories();
    const subcategory = await getsubCategory(id);
            const categoryproducts = await getCategoryProducts(id);
            const category = categorylist.find(cat => String(cat._id) === String(id));
            const products = await getallproduct(id);
            const categoryname = category ? category.name : "Not Found";
            const supsubcategory = await getsupersubCategory(id);
          
    
           
    
    res.render('menucard', {body: "",categorylist,categoryproducts,supsubcategory,subcategory,products,categoryname});
});








app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });