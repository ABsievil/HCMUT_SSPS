const baseUrl = "http://localhost:8090";

document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('paymentForm')
        .addEventListener('submit', function (event) {
            // prevent default behavior of submit
            event.preventDefault();
    
            const paymenAmount = document.getElementById("paymentAmount").value;
            const bank = document.getElementById("bank").value;

            fetch(`${baseUrl}/api/v1/payment/vn-pay?amount=${paymenAmount}&bankCode=${bank}`)
            .then(response => response.json())
            .then(data => {
                if(data.status=="OK"){
                    redirectUrl = data.data.toString();
                    window.location.href= redirectUrl;
                }
                else if(data.status=="ERROR"){
                    window.location.href="/payment?error=true";
                    console.error('Error with data:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

          
        });
});