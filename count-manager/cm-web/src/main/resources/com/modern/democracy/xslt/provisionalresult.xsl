<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format"
	xmlns:exslt="http://exslt.org/common">
	
	<xsl:attribute-set name="cellStyle">
  		<xsl:attribute name="border">solid 1px black</xsl:attribute>
  		<xsl:attribute name="font-size">10pt</xsl:attribute>
  		<xsl:attribute name="padding-left">4pt</xsl:attribute>
	</xsl:attribute-set>

	<xsl:attribute-set name="cellStyleBoldBorder">
  		<xsl:attribute name="border">solid 2px black</xsl:attribute>
  		<xsl:attribute name="font-size">10pt</xsl:attribute>
  		<xsl:attribute name="padding-left">4pt</xsl:attribute>
	</xsl:attribute-set>
	
	<xsl:attribute-set name="dottedUnderline">
  		<xsl:attribute name="border-bottom">1px dotted #000</xsl:attribute>
  		<xsl:attribute name="text-decoration">none</xsl:attribute>
	</xsl:attribute-set>

	<xsl:attribute-set name="solidBorderTopAndBottom">
  		<xsl:attribute name="border-top">0.5px solid #000</xsl:attribute>
  		<xsl:attribute name="border-bottom">0.5px solid #000</xsl:attribute>
  		<xsl:attribute name="padding-top">5px</xsl:attribute>
  		<xsl:attribute name="text-decoration">none</xsl:attribute>
	</xsl:attribute-set>

	<xsl:attribute-set name="solidBorderTop">
  		<xsl:attribute name="border-top">0.5px solid #000</xsl:attribute>
  		<xsl:attribute name="padding-top">5px</xsl:attribute>
  		<xsl:attribute name="text-decoration">none</xsl:attribute>
	</xsl:attribute-set>	
	
	<xsl:attribute-set name="solidBorderBottom">
  		<xsl:attribute name="border-bottom">0.5px solid #000</xsl:attribute>
  		<xsl:attribute name="padding-top">5px</xsl:attribute>
  		<xsl:attribute name="text-decoration">none</xsl:attribute>
	</xsl:attribute-set>	
	
	<xsl:variable name="emptyCell">
		<fo:table-cell>
			<fo:block />
		</fo:table-cell>
	</xsl:variable>	

	<xsl:variable name="emptyCellWithBorder">
		<fo:table-cell  xsl:use-attribute-sets="cellStyle">
			<fo:block />
		</fo:table-cell>
	</xsl:variable>	

	<xsl:variable name="emptyCellWithBoldBorder">
		<fo:table-cell  xsl:use-attribute-sets="cellStyleBoldBorder">
			<fo:block />
		</fo:table-cell>
	</xsl:variable>			
	
	<xsl:template match="/">
		<xsl:variable name="numberofcounts"><xsl:value-of select="count(provisionalresult/candidates/candidate[1]/votes/count)"/></xsl:variable>	
		<xsl:variable name="countcolumnwidth"><xsl:value-of select="format-number((60 div $numberofcounts) div 100, '##%')"/></xsl:variable>	
		
		<xsl:variable name="highestVotes">
     		<xsl:for-each select="//votes/count[$numberofcounts]">
       			<xsl:sort data-type="number" order="descending"/>
       			<xsl:if test="position()=1"><xsl:value-of select="."/></xsl:if>
     		</xsl:for-each>
   		</xsl:variable>

		<xsl:variable name="secondHighestVotes">
     		<xsl:for-each select="//votes/count[$numberofcounts]">
       			<xsl:sort data-type="number" order="descending"/>
       			<xsl:if test="position()=2"><xsl:value-of select="."/></xsl:if>
     		</xsl:for-each>
   		</xsl:variable>
		
		<xsl:variable name="numberOfBallotPapers">		
			<xsl:variable name="totalVotes"><xsl:value-of select="sum(//votes/count[number($numberofcounts)])"/></xsl:variable>
			<xsl:variable name="rejectPapers"><xsl:value-of select="//rejectedPapers/count[number($numberofcounts)]"/></xsl:variable>			
			<xsl:value-of select="$totalVotes + $rejectPapers"/>
     	</xsl:variable>
		
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master master-name="reportContent" margin-top="1cm" margin-bottom="1cm" margin-left="1cm"  margin-right="1cm">
				  <fo:region-body   margin-top="1cm" margin-bottom="1cm" margin-left="1cm"  margin-right="1cm"/>
				  <fo:region-before extent="1cm"/>
				  <fo:region-after  extent="1cm"/>
				  <fo:region-start  extent="1cm"/>
				  <fo:region-end    extent="1cm"/>
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="reportContent">
				<fo:static-content flow-name="xsl-region-before">
					<fo:block text-align="center" font-size="16pt" font-weight="bold"><xsl:value-of select="provisionalresult/electionTitle" /></fo:block>
				</fo:static-content>
				<fo:flow flow-name="xsl-region-body">						
					<fo:table table-layout="fixed" width="100%">
						<fo:table-column column-width="30%" />
						<fo:table-column column-width="70%" />
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell>
									<fo:block text-align="left" ><xsl:value-of select="'PROVISIONAL RESULT - '"/></fo:block>
								</fo:table-cell>
								<fo:table-cell>
									<fo:block text-align="left" font-weight="bold"><xsl:value-of select="provisionalresult/electoralArea" /></fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>		
										
					<fo:block text-align="left" font-size="12pt" padding-top="10px"><xsl:value-of select="'Ask Candidates and their Agents if they are satisfied with the conduct of the Count'"/></fo:block>
					
					<fo:table table-layout="fixed" width="100%" margin-top="10px">
						<fo:table-column column-width="5%" />
						<fo:table-column column-width="35%" />
						<fo:table-column column-width="20%" />		
						<fo:table-column column-width="40%" />			
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell font-size="10pt" font-weight="bold" xsl:use-attribute-sets="cellStyle">
									<fo:block><xsl:value-of select="'A.'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="10pt" font-weight="bold" xsl:use-attribute-sets="cellStyle" wrap-option="wrap">
									<fo:block><xsl:value-of select="'Total Ballot Papers in Ballot Boxes (column (2) of Form A)'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="10pt" font-weight="bold" xsl:use-attribute-sets="cellStyle" wrap-option="wrap">
									<fo:block><xsl:value-of select="provisionalresult/totalBallotPapers" /></fo:block>
								</fo:table-cell>
								<xsl:copy-of select="$emptyCell" />
							</fo:table-row>
						</fo:table-body>
					</fo:table>						
					
					<fo:table table-layout="fixed" width="100%" margin-top="10px">
						<fo:table-column column-width="40%" />					
						<xsl:call-template name="createcolumns">
							<xsl:with-param name="index">1</xsl:with-param>
							<xsl:with-param name="total"><xsl:value-of select="$numberofcounts" /></xsl:with-param>
							<xsl:with-param name="columnwidth"><xsl:value-of select="$countcolumnwidth" /></xsl:with-param>
						</xsl:call-template>
						<fo:table-body>
							<fo:table-row >
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="'Candidates'"/></fo:block>
								</fo:table-cell>
								<xsl:call-template name="createcolumnheaders">
									<xsl:with-param name="index">1</xsl:with-param>
									<xsl:with-param name="total"><xsl:value-of select="$numberofcounts" /></xsl:with-param>
								</xsl:call-template>								
							</fo:table-row>							
							<xsl:apply-templates select="provisionalresult/candidates"/>
						</fo:table-body>
					</fo:table>	
										
					<fo:table table-layout="fixed" width="100%" margin-top="10px">
						<fo:table-column column-width="5%" />
						<fo:table-column column-width="35%" />					
						<xsl:call-template name="createcolumns">
							<xsl:with-param name="index">1</xsl:with-param>
							<xsl:with-param name="total"><xsl:value-of select="$numberofcounts" /></xsl:with-param>
							<xsl:with-param name="columnwidth"><xsl:value-of select="$countcolumnwidth" /></xsl:with-param>
						</xsl:call-template>
						<fo:table-body>
							<fo:table-row >
								<xsl:copy-of select="$emptyCellWithBorder" />
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="'REJECTED BALLOTS'"/></fo:block>
								</fo:table-cell>
								<xsl:apply-templates select="provisionalresult/rejectedPapers"/>								
							</fo:table-row>
							<fo:table-row >
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="'B.'"/></fo:block>
								</fo:table-cell>								
								<fo:table-cell xsl:use-attribute-sets="cellStyle">
									<fo:block font-weight="bold"><xsl:value-of select="'TOTAL'"/></fo:block>
								</fo:table-cell>																
								<xsl:call-template name="createTotals">
									<xsl:with-param name="index">1</xsl:with-param>
									<xsl:with-param name="total"><xsl:value-of select="$numberofcounts" /></xsl:with-param>								
								</xsl:call-template>				
							</fo:table-row>
						</fo:table-body>
					</fo:table>						
					
					<fo:table table-layout="fixed" width="100%" margin-top="5px">
						<fo:table-column column-width="50%" />
						<fo:table-column column-width="50%" />
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell>
									<fo:block text-align="left" font-size="8pt" font-weight="bold"><xsl:value-of select="'NB. The totals at A and B should tally'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell>
									<fo:block text-align="right" font-size="8pt" font-weight="bold">* Include any doubtful ballot papers allowed as "good".</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>						
					
					<fo:block text-align="left" font-size="10pt" padding-top="10px" font-weight="bold" text-decoration="underline"><xsl:value-of select="'Majority'"/></fo:block>

					<fo:table table-layout="fixed" width="35%" margin-top="5px" border-separation="3pt">
						<fo:table-column column-width="45%" />
						<fo:table-column column-width="50%" />
						<fo:table-column column-width="5%" />
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell>
									<fo:block text-align="left" font-size="8pt"><xsl:value-of select="'Highest Votes'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="8pt">
									<fo:block>  
									    <xsl:value-of select="$highestVotes"/>  
								  </fo:block> 									
								</fo:table-cell>
								<xsl:copy-of select="$emptyCell" />
							</fo:table-row>
							<fo:table-row>
								<fo:table-cell>
									<fo:block text-align="left" font-size="8pt" padding-top="10px" ><xsl:value-of select="'2'" /><fo:inline vertical-align="super" font-size="4pt"><xsl:value-of select="'nd'"/></fo:inline> <xsl:value-of select="' Highest Votes'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="8pt" padding-top="10px" >
									<fo:block>  
									    <xsl:value-of select="$secondHighestVotes"/>  
								  	</fo:block> 									
								</fo:table-cell>								
								<fo:table-cell>
									<fo:block text-align="left" font-size="8pt" padding-top="10px" ><fo:leader leader-length="1mm" leader-pattern="space"></fo:leader><fo:leader leader-length="1mm" leader-pattern="rule" rule-style="solid" rule-thickness="0.2mm" color="black"></fo:leader></fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
								<xsl:copy-of select="$emptyCell" />							
								<fo:table-cell font-size="8pt" padding-top="0px" >
									<fo:block xsl:use-attribute-sets="solidBorderTopAndBottom">  
									    <xsl:value-of select="$highestVotes - $secondHighestVotes"/>  
								  </fo:block> 									
								</fo:table-cell>								
								<xsl:copy-of select="$emptyCell" />							
							</fo:table-row>
						</fo:table-body>
					</fo:table>	

					<fo:block text-align="left" font-size="10pt" padding-top="10px" font-weight="bold" text-decoration="underline"><xsl:value-of select="'% Poll'"/></fo:block>
					
					<fo:table table-layout="fixed" width="100%" margin-top="5px" border-separation="3pt">
						<fo:table-column column-width="50%" />
						<fo:table-column column-width="10%" />
						<fo:table-column column-width="5%" />
						<fo:table-column column-width="5%" />
						<fo:table-column column-width="10%" />
						<fo:table-body>
							<fo:table-row text-align="center" >
								<fo:table-cell text-align="left" >
									<fo:block font-size="8pt"><xsl:value-of select="'Number of Ballot Papers (Total at B above)'" /></fo:block>
								</fo:table-cell>	
								<fo:table-cell>
									<fo:block font-size="8pt">  
									    <xsl:value-of select="$numberOfBallotPapers"/>  
								  	</fo:block> 									
								</fo:table-cell>	
								<fo:table-cell>
									<fo:block font-size="8pt"><xsl:value-of select="'X'" /></fo:block>
								</fo:table-cell>	
								<fo:table-cell>
									<fo:block font-size="8pt"><xsl:value-of select="'100'" /></fo:block>
								</fo:table-cell>	
								<fo:table-cell>
									<fo:block font-size="8pt">  
										<fo:inline><xsl:value-of select="'=  '"/></fo:inline>
										<xsl:variable name="totalEligibleElectors"><xsl:value-of select="//totalEligibleElectors"/></xsl:variable>																
									    <xsl:value-of select="format-number($numberOfBallotPapers div $totalEligibleElectors, '#.##%')"/>
								  	</fo:block> 									
								</fo:table-cell>	
							</fo:table-row>	
							
							<fo:table-row text-align="center" >
								<fo:table-cell text-align="left" padding-top="10px">
									<fo:block font-size="8pt"><xsl:value-of select="'Divided by total eligible electors on Polling Day'" /></fo:block>
								</fo:table-cell>	
								<fo:table-cell padding-top="5px">
									<fo:block font-size="8pt" xsl:use-attribute-sets="solidBorderTop">  
									    <xsl:value-of select="//totalEligibleElectors"/>  
								  	</fo:block> 									
								</fo:table-cell>	
								<xsl:copy-of select="$emptyCell" />	
								<fo:table-cell padding-top="5px">
									<fo:block font-size="8pt" xsl:use-attribute-sets="solidBorderTop">
										<xsl:value-of select="'1'" />
									</fo:block>
								</fo:table-cell>	
								<xsl:copy-of select="$emptyCell" />	
							</fo:table-row>						
						</fo:table-body>
					</fo:table>			
					
 					<fo:table table-layout="fixed" width="50%" margin-top="20px">
						<fo:table-column column-width="25%" />
						<fo:table-column column-width="75%" />
						<fo:table-body>
							<fo:table-row >
								<fo:table-cell font-size="8pt" padding-top="10px">
									<fo:block><xsl:value-of select="'DRO Signature:'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="8pt" padding-top="12px">
									<fo:block xsl:use-attribute-sets="solidBorderBottom"/> 			
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
								<fo:table-cell font-size="8pt"  padding-top="10px">
									<fo:block><xsl:value-of select="'TS1 Signature:'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="8pt" padding-top="12px">
									<fo:block xsl:use-attribute-sets="solidBorderBottom"/> 			
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
								<fo:table-cell font-size="8pt"  padding-top="10px">
									<fo:block><xsl:value-of select="'TS2 Signature:'" /></fo:block>
								</fo:table-cell>
								<fo:table-cell font-size="8pt" padding-top="12px">
									<fo:block xsl:use-attribute-sets="solidBorderBottom"/> 			
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>		
					
					<fo:block text-align="left" font-size="10pt" padding-top="10px" font-weight="bold" text-decoration="underline"><xsl:value-of select="'NB: AFTER DECLARATION HAND ENVELOPE TO CANDIDATE ELECTED'"/></fo:block>
													
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
	<xsl:template match="candidates">
		<xsl:for-each select="candidate">
			<fo:table-row>
				<fo:table-cell xsl:use-attribute-sets="cellStyle" >
					<fo:block><xsl:value-of select="firsname" /><xsl:value-of select="' '" /><xsl:value-of select="surname" /></fo:block>
				</fo:table-cell>
				<xsl:for-each select="votes/count">
					<fo:table-cell xsl:use-attribute-sets="cellStyle">
						<fo:block><xsl:value-of select="." /></fo:block>
					</fo:table-cell>
				</xsl:for-each>
			</fo:table-row>						
		</xsl:for-each>
	</xsl:template>		
	<xsl:template match="rejectedPapers">
		<xsl:for-each select="count">
			<fo:table-cell xsl:use-attribute-sets="cellStyle">
				<fo:block><xsl:value-of select="." /></fo:block>
			</fo:table-cell>
		</xsl:for-each>
	</xsl:template>		
	<xsl:template name="createcolumns">
	    <xsl:param name="index"/>
	    <xsl:param name="total"/>
	    <xsl:param name="columnwidth"/>
	
		<fo:table-column>
			<xsl:attribute name="column-width"><xsl:value-of select="$columnwidth" /></xsl:attribute>
		</fo:table-column>
	
	    <xsl:if test="not($index = $total)">
	        <xsl:call-template name="createcolumns">
	            <xsl:with-param name="index" select="$index + 1" />
	            <xsl:with-param name="total" select="$total" />
	            <xsl:with-param name="columnwidth" select="$columnwidth" />
	        </xsl:call-template>
	    </xsl:if>
	</xsl:template>

	<xsl:template name="createcolumnheaders">
	    <xsl:param name="index"/>
	    <xsl:param name="total"/>
	
		<fo:table-cell xsl:use-attribute-sets="cellStyle">
			<xsl:choose>
				<xsl:when test="$index = 1">
					<fo:block font-weight="bold"><xsl:value-of select="'Votes*'"/></fo:block>		
				</xsl:when>
				<xsl:otherwise>
					<fo:block font-weight="bold"><xsl:value-of select="'Recount '"/><xsl:value-of select="$index - 1"/></fo:block>
				</xsl:otherwise>
			</xsl:choose>
		</fo:table-cell>
	
	    <xsl:if test="not($index = $total)">
	        <xsl:call-template name="createcolumnheaders">
	            <xsl:with-param name="index" select="$index + 1" />
	            <xsl:with-param name="total" select="$total" />
	        </xsl:call-template>
	    </xsl:if>
	</xsl:template>

	<xsl:template name="createTotals">
	    <xsl:param name="index"/>
	    <xsl:param name="total"/>

		<xsl:variable name="totalVotes"><xsl:value-of select="sum(//votes/count[number($index)])"/></xsl:variable>
		<xsl:variable name="rejectPapers"><xsl:value-of select="//rejectedPapers/count[number($index)]"/></xsl:variable>		

		<fo:table-cell xsl:use-attribute-sets="cellStyle">
			<fo:block><xsl:value-of select="$totalVotes + $rejectPapers" /></fo:block>
		</fo:table-cell>

	    <xsl:if test="not($index = $total)">
	        <xsl:call-template name="createTotals">
	            <xsl:with-param name="index" select="$index + 1" />
	            <xsl:with-param name="total" select="$total" />
	        </xsl:call-template>
	    </xsl:if>
	
	</xsl:template>	

</xsl:stylesheet>