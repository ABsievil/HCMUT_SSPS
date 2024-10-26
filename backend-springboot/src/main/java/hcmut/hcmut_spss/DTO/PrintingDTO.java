package hcmut.hcmut_spss.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrintingDTO {
    private String username;
    private Integer printer_id;
}
