
package com.modern.democracy.controller;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.modern.democracy.CountManagerApplication;

/**
 * @version $Id: $
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT, classes = CountManagerApplication.class)
public class PdfDownloadControllerIT {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    public PdfDownloadControllerIT() {
        super();
    }
    
    // ===========================================
    // Public Methods
    // ===========================================

    @Test
    public void testFormA() {        
        MultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
        map.add("electoralArea", "{}");
        
        ResponseEntity<byte[]> result = restTemplate.postForEntity("/forma", map, byte[].class);        
        assertTrue(result.getStatusCode().equals(HttpStatus.OK));
    }

    @Test
    public void testProvisionalResult() {        
        MultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();        
        map.add("provisionalResult", "{\"electionTitle\":\"City Council Election 2015 - Thursday, 7th May 2015\",\"electoralArea\":\"SOUTH YARDLEY Ward\",\"totalBallotPapers\":1234,\"totalEligibleElectors\":130,\"candidates\":[{\"firstName\":\"Pervez\",\"surname\":\"Akhtar\",\"counts\":[1,2,3,4,5]},{\"firstName\":\"Nawaz\",\"surname\":\"Ali\",\"counts\":[1,2,3,4,5]},{\"firstName\":\"Graham Michael\",\"surname\":\"Duffen\",\"counts\":[1,2,3,4,5]},{\"firstName\":\"Siobhan\",\"surname\":\"Friel\",\"counts\":[1,2,3,4,5]},{\"firstName\":\"Daphne\",\"surname\":\"Gaved\",\"counts\":[1,2,3,4,5]},{\"firstName\":\"Paul Daniel\",\"surname\":\"Holloway\",\"counts\":[1,2,3,4,6]}],\"rejectedPapers\":[10,20,30,40,50]}");
        
        ResponseEntity<byte[]> result = restTemplate.postForEntity("/provisionalresult", map, byte[].class);        
        assertTrue(result.getStatusCode().equals(HttpStatus.OK));
    }

    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

}
