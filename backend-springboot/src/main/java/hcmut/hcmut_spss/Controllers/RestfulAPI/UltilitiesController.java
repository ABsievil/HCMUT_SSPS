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
    public ResponseEntity<ResponseObject> getFileOfSemester(@PathVariable String semesterId) {
        return ultilitiesService.FNC_getFileOfSemester(semesterId);
    }

    @PutMapping("/addFileAccepted")
    public ResponseEntity<ResponseObject> addFileAccepted(
                        @RequestParam("semester") String semester, 
                        @RequestParam("typeAccepted") String typeAccepted){

        return ultilitiesService.PROC_addFileAccepted(semester, typeAccepted);
    }

    @PutMapping("/deleteFileAccepted")
    public ResponseEntity<ResponseObject> deleteFileAccepted(
                        @RequestParam("semester") String semester, 
                        @RequestParam("typeAccepted") String typeAccepted){

        return ultilitiesService.PROC_deleteFileAccepted(semester, typeAccepted);
    }

    @PutMapping("/addUltilityOfSemester")
    public ResponseEntity<ResponseObject> addUltilityOfSemester(@RequestBody UtilityDTO utilityDTO){
        return ultilitiesService.PROC_addUltilityOfSemester(utilityDTO);
    }
}
