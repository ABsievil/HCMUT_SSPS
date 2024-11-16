package hcmut.hcmut_spss.Controllers.RestfulAPI;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.RestfulAPI.UtilityDTO;
import hcmut.hcmut_spss.Services.RestfulAPI.UltilitiesService;

@RestController
@RequestMapping("/api/v1/Ultilities")
public class UltilitiesController {
    @Autowired
    private UltilitiesService ultilitiesService;

    @GetMapping("/getFileOfSemester/{semesterId}")
    public ResponseEntity<ResponseObject> getLogStudent(@PathVariable String semesterId) {
        return ultilitiesService.FNC_getFileOfSemester(semesterId);
    }

    @PutMapping("/addUltility")
    public ResponseEntity<ResponseObject> addUtility(@RequestBody UtilityDTO utilityDTO){
        return ultilitiesService.PROC_addUtility(utilityDTO);
    }

    @PutMapping("/insertFileType")
    public ResponseEntity<ResponseObject> insertFileType(
                        @RequestParam("semester") String semester, 
                        @RequestParam("typeAccepted") String typeAccepted){

        return ultilitiesService.PROC_insertFileType(semester, typeAccepted);
    }

    @PutMapping("/deleteFileType")
    public ResponseEntity<ResponseObject> deleteFileType(
                        @RequestParam("semester") String semester, 
                        @RequestParam("typeAccepted") String typeAccepted){

        return ultilitiesService.PROC_deleteFileType(semester, typeAccepted);
    }

    @PutMapping("/updateDateReset")
    public ResponseEntity<ResponseObject> updateDateReset(
                        @RequestParam("semester") String semester, 
                        @RequestParam("resetDate") Date resetDate){

        return ultilitiesService.PROC_updateDateReset(semester, resetDate);
    }

    @PutMapping("/updatePagePrice")
    public ResponseEntity<ResponseObject> updatePagePrice(
                        @RequestParam("semester") String semester, 
                        @RequestParam("pagePrice") Integer pagePrice){

        return ultilitiesService.PROC_updatePagePrice(semester, pagePrice);
    }

    @PutMapping("/updateDefaultPage")
    public ResponseEntity<ResponseObject> updateDefaultPage(
                        @RequestParam("semester") String semester, 
                        @RequestParam("defaultPage") Integer defaultPage){

        return ultilitiesService.PROC_updateDefaultPage(semester, defaultPage);
    }
}
