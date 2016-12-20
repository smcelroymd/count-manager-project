
package com.modern.democracy.dto;

/**
 * The Class ProvisionalResult.
 *
 * @version $Id: $
 */
public class ProvisionalResult {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================

    /** The election title. */
    private String electionTitle;

    /** The electoral area. */
    private String electoralArea;

    /** The total ballot papers. */
    private int totalBallotPapers;

    /** The total eligible electors. */
    private int totalEligibleElectors;

    /** The candidates. */
    private Candidate[] candidates;

    /** The rejected papers. */
    private int[] rejectedPapers;

    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    /**
     * Instantiates a new provisional result.
     */
    public ProvisionalResult() {
    }
    
    /**
     * Instantiates a new provisional result.
     *
     * @param electionTitle the election title
     * @param electoralArea the electoral area
     * @param totalBallotPapers the total ballot papers
     * @param totalEligibleElectors the total eligible electors
     * @param candidates the candidates
     * @param rejectedPapers the rejected papers
     */
    public ProvisionalResult(String electionTitle, String electoralArea, int totalBallotPapers, int totalEligibleElectors, Candidate[] candidates, int[] rejectedPapers) {
        super();
        this.electionTitle = electionTitle;
        this.electoralArea = electoralArea;
        this.totalBallotPapers = totalBallotPapers;
        this.totalEligibleElectors = totalEligibleElectors;
        this.candidates = candidates;
        this.rejectedPapers = rejectedPapers;
    }

    // ===========================================
    // Public Methods
    // ===========================================

    /**
     * Gets the candidates.
     *
     * @return the candidates
     */
    public Candidate[] getCandidates() {
        return candidates;
    }

    /**
     * Sets the candidates.
     *
     * @param candidates the new candidates
     */
    public void setCandidates(Candidate[] candidates) {
        this.candidates = candidates;
    }

    /**
     * Gets the rejected papers.
     *
     * @return the rejected papers
     */
    public int[] getRejectedPapers() {
        return rejectedPapers;
    }
    
    /**
     * Sets the rejected papers.
     *
     * @param rejectedPapers the new rejected papers
     */
    public void setRejectedPapers(int[] rejectedPapers) {
        this.rejectedPapers = rejectedPapers;
    }

    /**
     * Gets the election title.
     *
     * @return the election title
     */
    public String getElectionTitle() {
        return electionTitle;
    }

    /**
     * Sets the election title.
     *
     * @param electionTitle the new election title
     */
    public void setElectionTitle(String electionTitle) {
        this.electionTitle = electionTitle;
    }

    /**
     * Gets the electoral area.
     *
     * @return the electoral area
     */
    public String getElectoralArea() {
        return electoralArea;
    }

    /**
     * Sets the electoral area.
     *
     * @param electoralArea the new electoral area
     */
    public void setElectoralArea(String electoralArea) {
        this.electoralArea = electoralArea;
    }

    /**
     * Gets the total ballot papers.
     *
     * @return the total ballot papers
     */
    public int getTotalBallotPapers() {
        return totalBallotPapers;
    }

    /**
     * Sets the total ballot papers.
     *
     * @param totalBallotPapers the new total ballot papers
     */
    public void setTotalBallotPapers(int totalBallotPapers) {
        this.totalBallotPapers = totalBallotPapers;
    }

    /**
     * Gets the total eligible electors.
     *
     * @return the total eligible electors
     */
    public int getTotalEligibleElectors() {
        return totalEligibleElectors;
    }

    /**
     * Sets the total eligible electors.
     *
     * @param totalEligibleElectors the new total eligible electors
     */
    public void setTotalEligibleElectors(int totalEligibleElectors) {
        this.totalEligibleElectors = totalEligibleElectors;
    }

    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

}
