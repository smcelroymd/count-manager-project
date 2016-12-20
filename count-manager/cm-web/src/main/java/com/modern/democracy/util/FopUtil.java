package com.modern.democracy.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.net.URISyntaxException;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.commons.io.IOUtils;
import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;
import org.springframework.core.io.ClassPathResource;
import org.xml.sax.SAXException;

/**
 * @version $Id: $
 */
public class FopUtil {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================

    /** The Constant FOP_CONFIG_FILE. */
    private static final String FOP_CONFIG_FILE = "com/modern/democracy/util/fop.xconf";
    
    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    // ===========================================
    // Public Methods
    // ===========================================

    /**
     * Creates the pdf.
     *
     * @param xml the xml
     * @param xslt the xslt
     * @return the byte[]
     */
    public static byte[] createPdf(String xml, String xslt) {

        byte[] byteArray = null;
        ByteArrayOutputStream outStream = null;

        try {
            Source xmlSource = getXmlSource(xml);
            Source xsltSource = getXmlSource(xslt);

            /**
             *  Create an instance of fop factory
             */
            FopFactory fopFactory = FopFactory.newInstance(getConfigFile());

            /**
             *  Create the output stream
             */
            outStream = new ByteArrayOutputStream();

            /**
             *  Create transformer from TransformerFactory
             */
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer xslfoTransformer = transformerFactory.newTransformer(xsltSource);

            /**
             *  Construct fop with desired output format
             */
            Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, outStream);

            /**
             *  Resulting SAX events (the generated FO) must be piped through to FOP
             */
            Result res = new SAXResult(fop.getDefaultHandler());

            /**
             * Transform the xml to a pdf
             */
            xslfoTransformer.transform(xmlSource, res);

            /**
             * return the pdf bytes
             */
            byteArray = outStream.toByteArray();

        } catch (TransformerConfigurationException e) {
            handleException(e);
        } catch (FOPException e) {
            handleException(e);
        } catch (TransformerException e) {
            handleException(e);
        } catch (SAXException e) {
            handleException(e);
        } catch (IOException e) {
            handleException(e);
        } finally {
            IOUtils.closeQuietly(outStream);
        }

        return byteArray;
    }

    
    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

    /**
     * Gets the config file.
     *
     * @return the config file
     * @throws URISyntaxException the URI syntax exception
     * @throws IOException 
     */
    private static File getConfigFile() throws IOException {
        return new ClassPathResource(FOP_CONFIG_FILE).getFile();        
    }

    /**
     * Gets the xml source.
     *
     * @param xml the xml
     * @return the xml source
     */
    private static StreamSource getXmlSource(final String xml) {
        return new StreamSource(new StringReader(xml));
    }

    /**
     * Handle exception.
     *
     * @param e the e
     */
    private static void handleException(Exception e) {
        System.out.println(e.getMessage());       
    }
    
}
