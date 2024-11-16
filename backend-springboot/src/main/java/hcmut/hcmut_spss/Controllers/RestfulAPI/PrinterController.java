package hcmut.hcmut_spss.Controllers.RestfulAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.RestfulAPI.PrinterDTO;
import hcmut.hcmut_spss.Services.RestfulAPI.PrinterService;

@RestController
@RequestMapping("/api/v1/Printer")
public class PrinterController {
    @Autowired
    private PrinterService printerService;

    @PutMapping("/addPrinter")
    public ResponseEntity<ResponseObject> addPrinter(@RequestBody PrinterDTO printerDTO){
        return printerService.PROC_addPrinter(printerDTO);
    }

    @PutMapping("/enablePrinter/{printerId}")
    public ResponseEntity<ResponseObject> enablePrinter(@PathVariable Integer printerId){
        return printerService.PROC_enablePrinter(printerId);
    }

    @PutMapping("/disablePrinter/{printerId}")
    public ResponseEntity<ResponseObject> disablePrinter(@PathVariable Integer printerId){
        return printerService.PROC_disablePrinter(printerId);
    }

    @PutMapping("/updatePrinter/{printerId}")
    public ResponseEntity<ResponseObject> updatePrinter(
        @PathVariable Integer printerId,    
        @RequestBody PrinterDTO printerDTO){
        return printerService.PROC_updatePrinterInfor(printerId, printerDTO);
    }

    @GetMapping("/getPrinterInforById/{printerId}")
    public ResponseEntity<ResponseObject> getPrinterInforById(@PathVariable Integer printerId) {
        return printerService.FNC_getPrinterInforById(printerId);
    }

    @GetMapping("/getInforAllPrinter")
    public ResponseEntity<ResponseObject> getInforAllPrinter() {
        return printerService.FNC_getInforAllPrinter();
    }


}
