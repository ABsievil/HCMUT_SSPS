package hcmut.hcmut_spss.Services;

import hcmut.hcmut_spss.config.VNPAYConfig;
import hcmut.hcmut_spss.config.VNPayUtil;
import hcmut.hcmut_spss.DTO.ResponseObject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final VNPAYConfig vnPayConfig;

    public ResponseEntity<ResponseObject> createVnPayPaymentService(HttpServletRequest request, long amount, String bankCode) {
        amount = amount * 100L;
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();  // call variables of VNPay from app.properties
        
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }

        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

        //build query url included parameters and VNPay config variables in app.properties
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false); // variable support for creation of vnpSecureHash variable
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

        // build PaymentUrl return to client
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl; 

         return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query url for payment service successfull", paymentUrl));
    }
}