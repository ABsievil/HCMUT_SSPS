package hcmut.hcmut_spss.Services;

import java.text.MessageFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import hcmut.hcmut_spss.Services.Utils.OTPGenerator;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    public void sendEmail(String toEmail, String subject) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmailId);
        helper.setTo(toEmail);
        helper.setSubject(subject);

        // Create a HTML body with a template
        String htmlBody = "<html><body>";
        htmlBody += MessageFormat.format("<h2>Hi {0}</h2>", toEmail);
        htmlBody += "<p>We have sent to you the confirmation code: <b>09989</b></p>";
        htmlBody += "Please enter the code to our page! <br>";
        htmlBody += "If you not request to change the password, please ignore this email, sincerely!<br>";
        htmlBody += "</body></html>";

        helper.setText(htmlBody, true); // true indicates that the text is HTML

        mailSender.send(message);
        System.out.println("Mail Send...");
    }


    public void sendOTPEmail(String toEmail, String subject) throws MessagingException {
        String otp = OTPGenerator.generateOTP();
        saveOTPToDatabase(toEmail, otp);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom(fromEmailId);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        
        // Create HTML content
        String htmlBody = """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .otp-container {
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .otp-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1a73e8;
                        padding: 10px;
                        margin: 10px 0;
                        background-color: #f5f5f5;
                        border-radius: 4px;
                        display: inline-block;
                    }
                    .note {
                        color: #666;
                        font-size: 14px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="otp-container">
                    <h2>Verification Code</h2>
                    <p>Hello,</p>
                    <p>Your verification code is:</p>
                    <div class="otp-code">%s</div>
                    <p>This code will expire in 5 minutes.</p>
                    <p class="note">If you didn't request this code, please ignore this email.</p>
                </div>
            </body>
            </html>
        """.formatted(otp);
        
        helper.setText(htmlBody, true); // true indicates html
        
        mailSender.send(message);
    }
    
    // Implement phương thức này để lưu OTP
    private void saveOTPToDatabase(String toEmail, String otp) {
        // Lưu OTP với thời gian hết hạn (ví dụ: 5 phút)
    }
}
