const wishlists= require('../Models/wishListModel')

//add to wishlist
exports.addToWishlistController = async (req, res) => {
    const { id, title, price, description, category, image, rating } = req.body
    const userId = req.payload
    try {
        const exisitingproduct = await wishlists.findOne({ id, userId })
        if (exisitingproduct) {
            res.status(406).json("item already availabale in wishlist..")
        } else {
            const newProduct = new wishlists({
                id, title, price, description, category, image, rating, userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}


//get product
exports.getWishlistController = async (req,res)=>{
    const userId = req.payload
    try {
        const allProducts= await wishlists.find({userId})
        res.status(200).json(allProducts)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//remove item from wishlist
exports.removeProductWishlistController = async (req, res) => {
    const { id } = req.params
    try {
        const removeProduct = await wishlists.findByIdAndDelete({ _id: id })
        res.status(200).json(removeProduct)
    } catch (error) {
        res.status(401).json(error)
    }
}