package hcmut.hcmut_spss.Controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.Services.TransactionHistoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/Transaction")
@RequiredArgsConstructor
public class TransactionHistoryController {
    private final TransactionHistoryService TransactionHistoryService;

    @GetMapping("/log")
    public ResponseEntity<ResponseObject> listTransactions(
        @RequestParam(value = "Date_min", required = false) String Date_min,
        @RequestParam(value = "Date_max", required = false) String Date_max,
        @RequestParam(value = "Limit", required = false) Long Limit){
        
        return TransactionHistoryService.getTransactions(Date_min, Date_max, Limit);
    }
}