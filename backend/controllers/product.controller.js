import mongoose from 'mongoose';
import Product from '../models/product.model.js';
export const getProducts = async(req,res)=>{
    try{
        const products= await Product.find({});
        res.status(200).json({success:true,data:products});
    }
    catch(error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const createProduct=async(req,res)=>{
    const product=req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).send({message:"Name, Price and Image link are required"});
    }
    const newProduct= new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true,data : newProduct});
    }
    catch(error){
        console.error("Error in create product:", error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const updateProduct=async(req,res)=>{    
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid product ID"});
    }
    try{
        const updatedProduct= await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,message:"Product updated successfully"});
    }
    catch(error){
        console.error("Error in updating product:", error.message);
        res.status(500).json({success:false,message:"Server Error"});

    }
}

export const deleteProduct=async(req,res)=>{
    const productId=req.params.id;
    try {
        await Product.findByIdAndDelete(productId);
        res.status(200).json({success:true,message:"Product deleted successfully"});
    } catch (error) {
        console.error("Error in deleting product:", error.message);
     res.status(500).json({success:false,message:"server error"});   
    }
        
}