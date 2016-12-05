/*
 * 
 */
package com.modern.democracy.controller;

import java.io.IOException;
import java.net.URISyntaxException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.modern.democracy.dto.BallotBox;
import com.modern.democracy.dto.ElectoralArea;
import com.modern.democracy.util.FopUtil;
import com.thoughtworks.xstream.XStream;

/**
 * @version $Id: $
 */
@RestController
public class PdfDownloadController {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================
    
    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    public PdfDownloadController() {
        super();
    }
    
    // ===========================================
    // Public Methods
    // ===========================================

    @RequestMapping(value="/forma", method=RequestMethod.POST)
    public ResponseEntity<byte[]> getPDF(String electoralArea) {

        ResponseEntity<byte[]> response = null;
        HttpHeaders httpHeaders = createHeaders();

        ObjectMapper mapper = new ObjectMapper();
        
        try {
            ElectoralArea electoralAreaObj = mapper.readValue(electoralArea, ElectoralArea.class);
            System.out.println("############### Here...... ######################");
            byte[] contents = FopUtil.createPdf(marshal(electoralAreaObj), getXsl());
            response = new ResponseEntity<byte[]>(contents, httpHeaders, HttpStatus.OK);
        } catch (URISyntaxException | IOException e) {
            response = new ResponseEntity<byte[]>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }    
    
    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

    private String marshal(final ElectoralArea data) {
        XStream xstream = new XStream();
        xstream.alias("ballotboxcontent", ElectoralArea.class);
        xstream.alias("ballotbox", BallotBox.class);
        String xml = xstream.toXML(data);
        return xml;
    }
    
    /**
     * Creates the headers.
     *
     * @return the http headers
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        String filename = "forma.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return headers;
    }
    
//    private String getXml() {
//        return "<?xml version='1.0' encoding='UTF-8'?><ballotboxcontent><ward>Bournville</ward><ballotboxes><ballotbox><number>Postal 1</number><pollingstation></pollingstation><account>1181</account><inbox>1181</inbox></ballotbox><ballotbox><number>Postal 2</number><pollingstation></pollingstation><account>34</account><inbox>34</inbox></ballotbox><ballotbox><number>Postal 3</number><pollingstation></pollingstation><account>21</account><inbox>21</inbox></ballotbox><ballotbox><number>64/CFA</number><pollingstation>St. Francis Church, Linden Road</pollingstation><account>709</account><inbox>709</inbox></ballotbox><ballotbox><number>65/CFB</number><pollingstation>Kings Norton Girls school, Selly Oak Road</pollingstation><account>708</account><inbox>708</inbox></ballotbox><ballotbox><number>66/CFC</number><pollingstation>Village Hall, Woodlands Park Road</pollingstation><account>530</account><inbox>530</inbox></ballotbox><ballotbox><number>67/CFD</number><pollingstation>Masefield Hall, Masefield Square</pollingstation><account>349</account><inbox>349</inbox></ballotbox><ballotbox><number>68/CFE</number><pollingstation>St. Jospeh and St. Helen Parish Hall, 84 Northfield Road</pollingstation><account>757</account><inbox>757</inbox></ballotbox><ballotbox><number>69/CFF</number><pollingstation>Friends Meeting House, 23A Watford Road</pollingstation><account>613</account><inbox>613</inbox></ballotbox><ballotbox><number>70/CFG</number><pollingstation>Cotteridge Junior and Infant School, Breedon Road</pollingstation><account>445</account><inbox>445</inbox></ballotbox><ballotbox><number>61/CFH</number><pollingstation>Stirchley Primary School, Pershore Road</pollingstation><account>607</account><inbox>606</inbox></ballotbox><ballotbox><number>71/CFH</number><pollingstation>CFI Community Centre, 171 Pineapple Road</pollingstation><account>511</account><inbox>512</inbox></ballotbox><ballotbox><number>72/CFI</number><pollingstation>The Ascension Church Hall, Pineapple Grove</pollingstation><account>506</account><inbox>506</inbox></ballotbox><ballotbox><number>73/CFJ</number><pollingstation>Hub Hazelwell, adj. Hazelwell Church, 318 Vicarage Road</pollingstation><account>442</account><inbox>442</inbox></ballotbox><ballotbox><number>75/CFL</number><pollingstation>Methodist Church Hall, Cob Lane</pollingstation><account>535</account><inbox>535</inbox></ballotbox></ballotboxes></ballotboxcontent>";
//    }
    
    private String getXsl() throws URISyntaxException, IOException {
        ClassPathResource cpr = new ClassPathResource("com/modern/democracy/xslt/forma.xsl");        
        return new String(FileCopyUtils.copyToByteArray(cpr.getInputStream()));
    }    
    
}
