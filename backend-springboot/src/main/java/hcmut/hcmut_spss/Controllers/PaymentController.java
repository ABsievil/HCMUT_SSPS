package hcmut.hcmut_spss.Controllers;

import hcmut.hcmut_spss.Services.PaymentService;
import hcmut.hcmut_spss.DTO.ResponseObject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/vn-pay")
    public ResponseEntity<ResponseObject>
        paymentRequest( HttpServletRequest request,
                        @RequestParam("amount") long amount, 
                        @RequestParam("bankCode") String bankCode ){
        return paymentService.createVnPayPaymentService(request, amount, bankCode);
    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<ResponseObject> payCallbackHandlerRequest(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Callback successfull", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseObject("Failed", "Callback Failed", null));
        }
    }

}
