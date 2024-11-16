package hcmut.hcmut_spss.DTO.RestfulAPI;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrinterDTO {
    private String brand_name;
    private String printer_model;
    private String description;
    private String campus;
    private String building;
    private String room;
}