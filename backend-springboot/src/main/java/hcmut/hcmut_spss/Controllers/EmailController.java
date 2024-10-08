package hcmut.hcmut_spss.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.Services.EmailSenderService;
import jakarta.mail.MessagingException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class EmailController {
    @Autowired
    private EmailSenderService emailSenderService;

    @GetMapping("/sendEmail")
    public ResponseEntity<ResponseObject> sendEmailRequest(@RequestParam("toGmail") String gmail) {
        try {
            emailSenderService.sendOTPEmail(gmail, "Authentication Code for SalesWebsite");
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK",  "Sent email Successfully", null));
        } catch (MessagingException e) {
            // Handle the exception here, e.g., log the error or return an error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseObject("Failed", "Error sending email: " + e.getMessage(), null));
        }
    }
    
}
