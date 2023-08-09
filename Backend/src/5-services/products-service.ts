import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHelper from "../2-utils/image-helper";
import { RecurseNotFoundError } from "../3-models/error-models";
import ProductModel from "../3-models/product-model";

// Get all products:
async function getAllProducts(): Promise<ProductModel[]> {

    // Create sql:
    const sql = `SELECT 
    ProductID AS id,
    ProductName AS name,
    UnitPrice AS price,
    UnitsInStock AS stock,
    CONCAT('${appConfig.domainName}/api/products/', imageName) AS imageUrl
     FROM products`;

    // Get products from database:
    const products = await dal.execute(sql); // Returns array

    // Return products:
    return products;
}

// Get one product:
async function getOneProduct(id: number): Promise<ProductModel> {

    // Create sql:
    const sql = `SELECT ProductID AS id,
    ProductName AS name,
    UnitPrice AS price,
    UnitsInStock AS stock,
    CONCAT('${appConfig.domainName}/api/products/', imageName) AS imageUrl
     FROM products 
     WHERE ProductID = ${id}`;

    // Get products from database:
    const products = await dal.execute(sql); // Returns array

    // Extract a single product:
    const product = products[0];

    // If no such product:
    if (!product) throw new RecurseNotFoundError(id);

    // Return products:
    return products;
}

// Add new product:
async function addProduct(product: ProductModel): Promise<ProductModel> {

    // Validate:
    product.validate();

    // Save image:
    const imageName = await imageHelper.saveImage(product.image);

    // Create sql:
    const sql = `INSERT INTO products(ProductName, UnitPrice, UnitsInStock, ImageName)
    VALUES('${product.name}',${product.price}, ${product.stock}, '${imageName}')`;

    //  Execute sql:
    const info: OkPacket = await dal.execute(sql);

    // Extract new id:
    product.id = info.insertId;

    // Get image url:
    product.imageUrl = `${appConfig.domainName}/api/products/${imageName}`;

    // Remove image from product object:
    delete product.image;

    // Return added product:
    return product;
}

// Update product:
async function updateProduct(product: ProductModel): Promise<ProductModel> {

    // Validate:
    product.validate();

    let sql = "";
    let imageName = "";

    // Id client send image to update:
    if (product.image) {
        const oldImage = await getOldImage(product.id);
        imageName = await imageHelper.updateImage(product.image, oldImage);
        sql = `UPDATE products SET 
        ProductName = '${product.name}',
        UnitPrice = ${product.price},
        UnitsInStock = ${product.stock},
        ImageName = '${imageName}'
        WHERE ProductID = ${product.id}`;
    }
    else {
        sql = `UPDATE products SET 
        ProductName = '${product.name}',
        UnitPrice = ${product.price},
        UnitsInStock = ${product.stock}
        WHERE ProductID = ${product.id}`;
    }

    // Execute sql:
    const info: OkPacket = await dal.execute(sql);

    // If product not exist:
    if (info.affectedRows === 0) throw new RecurseNotFoundError(product.id);

    // Get image url:
    product.imageUrl = `${appConfig.domainName}/api/products/${imageName}`;

    // Remove image from product object:
    delete product.image;

    // Return added product:
    return product;
}

// Delete product:
async function deleteProduct(id: number): Promise<void> {

    // Take old image:
    const oldImage = await getOldImage(id);

    // Delete that image:
    await imageHelper.deleteImage(oldImage);

    // Create sql:
    const sql = `DELETE FROM products WHERE ProductID = ${id}`;

    // Execute sql:
    const info: OkPacket = await dal.execute(sql);

    // If product not exist (not a must):
    if (info.affectedRows === 0) throw new RecurseNotFoundError(id);
}

// Get image name:
async function getOldImage(id: number): Promise<string> {
    const sql = `SELECT imageName FROM products WHERE productId = ${id}`;
    const products = await dal.execute(sql);
    const product = products[0];
    if (!product) return null;
    const imageName = product.imageName;
    return imageName;
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
};