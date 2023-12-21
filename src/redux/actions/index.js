// here we will impelement what we want to do in cart page (additem or delete item) from products

export const AddItem = (product)=>{
    return{
        type : "ADDITEM",
        payload : product
    }
}

export const DeleteItem = (product)=>{
    return{
        type : "DELITEM",
        payload : product
    }
}