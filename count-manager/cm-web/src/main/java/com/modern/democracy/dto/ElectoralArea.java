
package com.modern.democracy.dto;

import java.util.List;

/**
 * The Class ElectoralArea.
 *
 * @version $Id: $
 */
public class ElectoralArea {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================

    /** The name. */
    private String name;

    /** The ballot boxes. */
    private List<BallotBox> ballotBoxes;

    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    /**
     * Instantiates a new electoral area.
     */
    public ElectoralArea() {
    }

    /**
     * Instantiates a new electoral area.
     *
     * @param name the name
     * @param ballotBoxes the ballot boxes
     */
    public ElectoralArea(String name, List<BallotBox> ballotBoxes) {
        super();
        this.name = name;
        this.ballotBoxes = ballotBoxes;
    }

    // ===========================================
    // Public Methods
    // ===========================================

    /**
     * Gets the name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name.
     *
     * @param name the new name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the ballot boxes.
     *
     * @return the ballot boxes
     */
    public List<BallotBox> getBallotBoxes() {
        return ballotBoxes;
    }

    /**
     * Sets the ballot boxes.
     *
     * @param ballotBoxes the new ballot boxes
     */
    public void setBallotBoxes(List<BallotBox> ballotBoxes) {
        this.ballotBoxes = ballotBoxes;
    }

    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

}
