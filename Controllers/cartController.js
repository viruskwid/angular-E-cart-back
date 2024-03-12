const cartItems = require('../Models/cartModel')

//add to cart

exports.addToCartController = async(req,res)=>{
    const {id,title,price,image,quantity} = req.body
    const userId = req.payload
    try {
        const exisitingproduct = await cartItems.findOne({id,userId})
        if (exisitingproduct) {
           exisitingproduct.quantity+=1
           exisitingproduct.totalPrice = exisitingproduct.price * exisitingproduct.quantity
           await exisitingproduct.save()
           res.status(200).json("Items added to cart") 
        }else{
            const newProduct = new cartItems({
                id,title,price,image,quantity,totalPrice:price,userId
            })
            await newProduct.save()
            res.status(200).json("Item added to cart") 
        }
    } catch (error) {
        
    }
}

//get cart
exports.getCartController = async (req,res)=>{
    const userId = req.payload
    try{
        const allProducts = await cartItems.find({userId})
        res.status(200).json(allProducts)
    }catch(err){
      res.status(401).json(err)
    }
}

//remove cart item
exports.removeCartItemController = async(req,res)=>{
    const { id } = req.params
    try {
        const removeProduct = await cartItems.findByIdAndDelete({ _id: id })
        res.status(200).json(removeProduct)
    } catch (err) {
        res.status(401).json(err)
    }

}

//incrementing Quantity
exports.incrementQuantity = async(req,res)=>{
    const {id} = req.params
    try {
       const selectedProduct = await cartItems.findOne({_id:id}) 
       selectedProduct.quantity+=1
       selectedProduct.totalPrice = selectedProduct.quantity*selectedProduct.price
       await selectedProduct.save()
       res.status(200).json(selectedProduct)
    } catch (error) {
         res.status(401).json(error)
    }
}
//incrementing Quantity
exports.decrementQuantity = async(req,res)=>{
    const {id} = req.params
    try {
       const selectedProduct = await cartItems.findOne({_id:id}) 
       selectedProduct.quantity-=1
     if (selectedProduct.quantity==0) {
        await cartItems.deleteOne({id:_id})
        res.status(200).json("quantity updated")
     } else {
        selectedProduct.totalPrice = selectedProduct.quantity*selectedProduct.price
        await selectedProduct.save()
        res.status(200).json(selectedProduct)
     }
    } catch (error) {
         res.status(401).json(error)
    }
}

//emptycart'
exports.emptyController = async(req,res)=>{
    const userId = req.payload
    try {
        const result = await cartItems.deleteMany({ userId })
        res.status(200).json('deleted Successfully')
    } catch (err) {
        res.status(401).json(err)
    }
}