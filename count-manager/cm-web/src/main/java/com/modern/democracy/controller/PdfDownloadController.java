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
import com.modern.democracy.dto.Candidate;
import com.modern.democracy.dto.ElectoralArea;
import com.modern.democracy.dto.ProvisionalResult;
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
    public ResponseEntity<byte[]> formA(String electoralArea) {
        
        ResponseEntity<byte[]> response = null;
        
        try {
            response = createReport(electoralArea, getFormAXsl(), ElectoralArea.class);
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }
        
        return response;
    }    

    @RequestMapping(value="/provisionalresult", method=RequestMethod.POST)
    public ResponseEntity<byte[]> provisionalResult(String provisionalResult) {                        
        
        ResponseEntity<byte[]> response = null;

        try {
            response = createReport(provisionalResult, getProvisionalCountXsl(), ProvisionalResult.class);
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }

        return response;
    } 
    
    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

    public ResponseEntity<byte[]> createReport(String xml, String xsl, Class<?> clazz) {

        ResponseEntity<byte[]> response = null;
        HttpHeaders httpHeaders = createHeaders();

        ObjectMapper mapper = new ObjectMapper();
        
        try {
            Object electoralAreaObj = mapper.readValue(xml, clazz);
            byte[] contents = FopUtil.createPdf(marshal(electoralAreaObj), xsl);
            response = new ResponseEntity<byte[]>(contents, httpHeaders, HttpStatus.OK);
        } catch (IOException e) {
            response = new ResponseEntity<byte[]>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    } 
    
    
    private String marshal(final Object data) {
        XStream xstream = new XStream();
        xstream.alias("ballotboxcontent", ElectoralArea.class);
        xstream.alias("ballotbox", BallotBox.class);
        xstream.alias("provisionalresult", ProvisionalResult.class);    
        xstream.alias("candidate", Candidate.class);
        xstream.alias("count", int.class);
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
    
    private String getFormAXsl() throws URISyntaxException, IOException {
        ClassPathResource cpr = new ClassPathResource("com/modern/democracy/xslt/forma.xsl");        
        return new String(FileCopyUtils.copyToByteArray(cpr.getInputStream()));
    }    

    private String getProvisionalCountXsl() throws URISyntaxException, IOException {
        ClassPathResource cpr = new ClassPathResource("com/modern/democracy/xslt/provisionalresult.xsl");        
        return new String(FileCopyUtils.copyToByteArray(cpr.getInputStream()));
    }    

}
