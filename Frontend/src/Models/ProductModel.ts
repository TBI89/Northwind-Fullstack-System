class ProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string; // Image URL serving the uploaded image.
    public image: File; // Image file to upload to backed.
}

export default ProductModel;
