package hcmut.hcmut_spss.Services;
import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.PaymentConfig.TransactionHistoryConfig;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionHistoryService {
    private final RestTemplate restTemplate ;
    private final TransactionHistoryConfig TransactionHistoryConfig; 

    public ResponseEntity<ResponseObject> getTransactions(String Date_min, String Date_max, Long Limit) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + TransactionHistoryConfig.getApiToken()); 
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            String url = TransactionHistoryConfig.getSepayApiUrl();
            boolean isFirstParam = true;
            if (Date_min != null && !Date_min.isEmpty()) {
                url += (isFirstParam ? "?" : "&") + "transaction_date_min=" + Date_min + " 00:00:00"; 
                isFirstParam = false;
                if (Date_max == null || Date_max.isEmpty()) {
                    Date_max = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + " 00:00:00";
                } else if(!isFirstParam){
                    Date_max += " 00:00:00";
                    url += "&" + "transaction_date_max=" + Date_max;
                }
            }
            
            if(Limit != null) url += (isFirstParam ? "?" : "&")  +"limit="+ Limit;
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get log for transactions service successful", jsonNode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Transaction query failed", null));
        }
    }
}