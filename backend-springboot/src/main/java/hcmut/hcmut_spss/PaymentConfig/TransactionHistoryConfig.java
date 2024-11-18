package hcmut.hcmut_spss.PaymentConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import lombok.Getter;
@Configuration
public class TransactionHistoryConfig {
    @Getter
    @Value("${sepay.api.url}")
    private String sepayApiUrl;

    @Getter
    @Value("${sepay.api.token}")
    private String apiToken;
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}