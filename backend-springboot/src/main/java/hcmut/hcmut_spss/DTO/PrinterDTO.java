package hcmut.hcmut_spss.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrinterDTO {
    private Integer printer_id;
    private String branch_name;
    private String printer_model;
    private String description;
    private String campus;
    private String building;
    private String room;
    private Boolean state;
}
