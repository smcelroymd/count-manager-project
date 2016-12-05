
package com.modern.democracy.dto;

/**
 * The Class BallotBox.
 *
 * @version $Id: $
 */
public class BallotBox {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================

    /** The number. */
    private String number;

    /** The polling station. */
    private String pollingStation;

    /** The ballot paper account value. */
    private String ballotPaperAccountValue;

    /** The box value. */
    private String boxValue;

    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    /**
     * Instantiates a new ballot box.
     */
    public BallotBox() {
        super();
    }

    /**
     * Instantiates a new ballot box.
     *
     * @param number the number
     * @param pollingStation the polling station
     * @param ballotPaperAccountValue the ballot paper account value
     * @param boxValue the box value
     */
    public BallotBox(String number, String pollingStation, String ballotPaperAccountValue, String boxValue) {
        super();
        this.number = number;
        this.pollingStation = pollingStation;
        this.ballotPaperAccountValue = ballotPaperAccountValue;
        this.boxValue = boxValue;
    }

    // ===========================================
    // Public Methods
    // ===========================================

    /**
     * Gets the number.
     *
     * @return the number
     */
    public String getNumber() {
        return number;
    }

    /**
     * Sets the number.
     *
     * @param number the new number
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * Gets the polling station.
     *
     * @return the polling station
     */
    public String getPollingStation() {
        return pollingStation;
    }

    /**
     * Sets the polling station.
     *
     * @param pollingStation the new polling station
     */
    public void setPollingStation(String pollingStation) {
        this.pollingStation = pollingStation;
    }

    /**
     * Gets the ballot paper account value.
     *
     * @return the ballot paper account value
     */
    public String getBallotPaperAccountValue() {
        return ballotPaperAccountValue;
    }

    /**
     * Sets the ballot paper account value.
     *
     * @param ballotPaperAccountValue the new ballot paper account value
     */
    public void setBallotPaperAccountValue(String ballotPaperAccountValue) {
        this.ballotPaperAccountValue = ballotPaperAccountValue;
    }

    /**
     * Gets the box value.
     *
     * @return the box value
     */
    public String getBoxValue() {
        return boxValue;
    }

    /**
     * Sets the box value.
     *
     * @param boxValue the new box value
     */
    public void setBoxValue(String boxValue) {
        this.boxValue = boxValue;
    }

    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

}
