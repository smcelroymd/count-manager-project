
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

    @SuppressWarnings("unchecked")
    @Test
    public void testTest() {
        
        MultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
        map.add("electoralArea", "{}");
        
        ResponseEntity<byte[]> result = restTemplate.postForEntity("/forma", map, byte[].class);        
        assertTrue(result.getStatusCode().equals(HttpStatus.OK));
    }

    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

}
