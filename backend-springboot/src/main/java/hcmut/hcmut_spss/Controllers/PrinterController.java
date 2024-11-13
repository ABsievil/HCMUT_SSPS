package hcmut.hcmut_spss.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.PrinterDTO;
import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.Services.PrinterService;

@RestController
@RequestMapping("/api/v1/Printer")
public class PrinterController {
    @Autowired
    private PrinterService printerService;

    @GetMapping("/getPrintersInformation")
    public ResponseEntity<ResponseObject> getPrinter_information() {
        return printerService.FNC_getPrinter_information();
    }

    @PutMapping("/addPrinter")
    public ResponseEntity<ResponseObject> addPrinter(@RequestBody PrinterDTO printerDTO){
        return printerService.PROC_addPrinter(printerDTO);
    }
}
