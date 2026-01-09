
    jQuery(".buy-charge").click(function() {
        Payhip.Checkout.open({
        product: "RGsF",
        message: "A custom message to add to the checkout"
    });
 });