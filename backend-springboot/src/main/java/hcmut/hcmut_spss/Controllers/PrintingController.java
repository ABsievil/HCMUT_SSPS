package hcmut.hcmut_spss.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.Services.PrinterService;
import hcmut.hcmut_spss.Services.PrintingService;

@RestController
@RequestMapping("/api/v1/Printing")
public class PrintingController {
    @Autowired
    private PrintingService printingService;

    @GetMapping("/getPrintingInformation")
    public ResponseEntity<ResponseObject> getPrinting_information() {
        return printingService.getPrinting_information();
    }
}
