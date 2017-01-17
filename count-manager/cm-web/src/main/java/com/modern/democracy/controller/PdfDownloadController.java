/*
 * 
 */
package com.modern.democracy.controller;

import java.io.IOException;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    
    Logger logger = LoggerFactory.getLogger(PdfDownloadController.class);
    
    /** The Constant FORMA_FILENAME. */
    private static final String FORMA_FILENAME = "forma.pdf";
    
    /** The Constant PROVISIONAL_RESULT_FILENAME. */
    private static final String PROVISIONAL_RESULT_FILENAME = "provisionalresult.pdf";
    
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
        logger.info("Entering formA");
        ResponseEntity<byte[]> response = null;
        
        try {
            response = createReport(electoralArea, getFormAXsl(), FORMA_FILENAME, ElectoralArea.class);
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }
        
        logger.info("Exiting  formA");
        return response;
    }    

    @RequestMapping(value="/provisionalresult", method=RequestMethod.POST)
    public ResponseEntity<byte[]> provisionalResult(String provisionalResult) {                        
        logger.info("Entering provisionalResult");
        
        ResponseEntity<byte[]> response = null;

        try {
            response = createReport(provisionalResult, getProvisionalCountXsl(), PROVISIONAL_RESULT_FILENAME, ProvisionalResult.class);
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }

        logger.info("Exiting provisionalResult");
        return response;
    } 
    
    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

    public ResponseEntity<byte[]> createReport(String xml, String xsl, String filename, Class<?> clazz) {
        logger.info("Entering createRepor");

        ResponseEntity<byte[]> response = null;
        HttpHeaders httpHeaders = createHeaders(filename);

        ObjectMapper mapper = new ObjectMapper();
        
        try {
            Object electoralAreaObj = mapper.readValue(xml, clazz);
            byte[] contents = FopUtil.createPdf(marshal(electoralAreaObj), xsl);
            response = new ResponseEntity<byte[]>(contents, httpHeaders, HttpStatus.OK);
        } catch (IOException e) {
            response = new ResponseEntity<byte[]>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        logger.info("Exiting createRepor");
        return response;
    } 
    
    
    private String marshal(final Object data) {
        logger.info("Entering marshal");
        XStream xstream = new XStream();
        xstream.alias("ballotboxcontent", ElectoralArea.class);
        xstream.alias("ballotbox", BallotBox.class);
        xstream.alias("provisionalresult", ProvisionalResult.class);    
        xstream.alias("candidate", Candidate.class);
        xstream.alias("count", int.class);
        String xml = xstream.toXML(data);
        logger.info("Exiting  marshal");
        return xml;
    }

    
    /**
     * Creates the headers.
     *
     * @return the http headers
     */
    private HttpHeaders createHeaders(final String filename) {
        logger.info("Entering marshal");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        logger.info("Exiting marshal");
        return headers;
    }
    
    private String getFormAXsl() throws URISyntaxException, IOException {
        logger.info("Entering getFormAXsl");
        ClassPathResource cpr = new ClassPathResource("com/modern/democracy/xslt/forma.xsl");
        String formAXsl;
        
        try {
            formAXsl = new String(FileCopyUtils.copyToByteArray(cpr.getInputStream()));
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }
        
        logger.info("Exiting formAXsl = " + formAXsl);
        return formAXsl;
    }    

    private String getProvisionalCountXsl() throws URISyntaxException, IOException {
        logger.info("Entering getProvisionalCountXsl");

        ClassPathResource cpr = new ClassPathResource("com/modern/democracy/xslt/provisionalresult.xsl"); 
        String countXsl;
        
        try {
            countXsl = new String(FileCopyUtils.copyToByteArray(cpr.getInputStream()));
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }
      
        logger.info("Exiting getProvisionalCountXsl. CountXsl = " + countXsl);
        return countXsl;
    }    

}
