package hcmut.hcmut_spss.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.UtilityDTO;
import hcmut.hcmut_spss.Services.UltilitiesService;

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

}
