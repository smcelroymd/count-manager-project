<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
	
	<xsl:attribute-set name="cellStyle">
  		<xsl:attribute name="border">solid 1px black</xsl:attribute>
  		<xsl:attribute name="font-size">10pt</xsl:attribute>
  		<xsl:attribute name="padding-left">4pt</xsl:attribute>
	</xsl:attribute-set>
	
	<xsl:attribute-set name="dottedUnderline">
  		<xsl:attribute name="border-bottom">1px dotted #000</xsl:attribute>
  		<xsl:attribute name="text-decoration">none</xsl:attribute>
	</xsl:attribute-set>
	
	<xsl:variable name="emptyCell">
		<fo:table-cell>
			<fo:block />
		</fo:table-cell>
	</xsl:variable>	
	
	<xsl:template match="/">
		<xsl:variable name="totalAccount"><xsl:value-of select="sum(ballotboxcontent/ballotBoxes/ballotbox/ballotPaperAccountValue)"/></xsl:variable>	
		<xsl:variable name="totalInBox"><xsl:value-of select="sum(ballotboxcontent/ballotBoxes/ballotbox/boxValue)"/></xsl:variable>	


		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master master-name="reportContent" margin-top="1cm" margin-bottom="1cm" margin-left="1cm"  margin-right="1cm">
				  <fo:region-body   margin-top="5.5cm" margin-bottom="1cm" margin-left="1cm"  margin-right="1cm"/>
				  <fo:region-before extent="5.5cm"/>
				  <fo:region-after  extent="1cm"/>
				  <fo:region-start  extent="1cm"/>
				  <fo:region-end    extent="1cm"/>
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="reportContent">
				<fo:static-content flow-name="xsl-region-before">
					<fo:block text-align="center" font-size="16pt" font-weight="bold" xsl:use-attribute-sets="cellStyle">Contents of Ballot Boxes</fo:block>
					<fo:block text-align="right" font-size="10pt">Printed: 21 April 016</fo:block>					
					<fo:table table-layout="fixed" width="100%">
						<fo:table-column column-width="33%" />
						<fo:table-column column-width="33%" />
						<fo:table-column column-width="34%" />					
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell>
									<fo:block text-align="left" >Ward: <xsl:value-of select="ballotboxcontent/name" /></fo:block>
								</fo:table-cell>
								<fo:table-cell>
									<fo:block text-align="center">Election Date: 05/05/2016</fo:block>
								</fo:table-cell>
								<fo:table-cell>
									<fo:block text-align="right" text-decoration="underline">FORM A</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>		
					<fo:block text-align="left" font-size="10pt" margin-top="3mm"  >
					For each Ballot Paper Account put the figure at item F in Column (1) below, enter the number of Ballot Papers found in the box (after recounting if necessary) in column (2) below and show any discrepancy in column (3).
					</fo:block>	 
					<fo:block text-align="left" font-size="10pt" margin-top="3mm">
					There will be two postal boxes per Ward, one delivered to the DRO ready to be verified at 10 pm and a final box (containing ballot papers from postal votes processed on polling day) delivered to the DRO after receipt of documents from all polling stations. The form contains provision for three boxes but you will be notified if more than two are required. 
					</fo:block>		
				</fo:static-content>
				<fo:flow flow-name="xsl-region-body">				
 					<fo:table table-layout="fixed" width="100%" margin-top="0.1cm">
						<fo:table-column column-width="10%" />
						<fo:table-column column-width="60%" />
						<fo:table-column column-width="10%" />
						<fo:table-column column-width="10%" />
						<fo:table-column column-width="10%" />										
						<fo:table-body>
							<fo:table-row >
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="'Box No'"/></fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="'Polling Station'"/></fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold" text-align="center" ><xsl:value-of select="'(1)'"/></fo:block>
									<fo:block font-weight="bold" text-align="center" ><xsl:value-of select="'Acount'"/></fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold" text-align="center" ><xsl:value-of select="'(2)'"/></fo:block>
									<fo:block font-weight="bold" text-align="center" ><xsl:value-of select="'In Box'"/></fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold" text-align="center" ><xsl:value-of select="'(3)'"/></fo:block>
									<fo:block font-weight="bold" text-align="center" ><xsl:value-of select="'+/-'"/></fo:block>
								</fo:table-cell>
							</fo:table-row>						
							<xsl:apply-templates />
 							<fo:table-row >
								<xsl:copy-of select="$emptyCell" />
								<fo:table-cell padding-right="10px" xsl:use-attribute-sets="cellStyle">
									<fo:block text-align="right"><xsl:value-of select="'Total Contents of Ballot Boxes'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="$totalAccount"/> </fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="$totalInBox"/> </fo:block>
								</fo:table-cell>
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="$totalInBox - $totalAccount"/></fo:block>
								</fo:table-cell>
							</fo:table-row>						
						</fo:table-body>
					</fo:table>	
					<fo:table table-layout="fixed" width="100%" margin-top="20px">
						<fo:table-column column-width="10%" />
						<fo:table-column column-width="60%" />
						<fo:table-column column-width="30%" />					
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell font-size="10pt">
									<fo:block><xsl:value-of select="'Signed:'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="10pt" xsl:use-attribute-sets="dottedUnderline">
									<fo:block />
								</fo:table-cell>
								<fo:table-cell font-size="10pt" padding-left="10px">
									<fo:block ><xsl:value-of select="'Deputy Returnng Officer'"/></fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>						
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
	<xsl:template match="ballotBoxes">
		<xsl:for-each select="ballotbox">
			<fo:table-row>
				<fo:table-cell xsl:use-attribute-sets="cellStyle" >
					<fo:block><xsl:value-of select="number" /></fo:block>
				</fo:table-cell>
				<fo:table-cell xsl:use-attribute-sets="cellStyle">
					<fo:block><xsl:value-of select="pollingStation" /></fo:block>
				</fo:table-cell>
				<fo:table-cell xsl:use-attribute-sets="cellStyle">
					<fo:block><xsl:value-of select="ballotPaperAccountValue" /></fo:block>
				</fo:table-cell>
				<fo:table-cell xsl:use-attribute-sets="cellStyle">
					<fo:block><xsl:value-of select="boxValue" /></fo:block>
				</fo:table-cell>
				<fo:table-cell xsl:use-attribute-sets="cellStyle">
					<fo:block><xsl:value-of select="boxValue - ballotPaperAccountValue" /></fo:block>
				</fo:table-cell>
			</fo:table-row>						
		</xsl:for-each>
	</xsl:template>	
</xsl:stylesheet>