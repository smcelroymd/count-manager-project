
package com.modern.democracy.dto;

/**
 * The Class Candidate.
 *
 * @version $Id: $
 */
public class Candidate {

    // ===========================================
    // Public Members
    // ===========================================

    // ===========================================
    // Private Members
    // ===========================================

    /** The first name. */
    private String firstName;

    /** The surname. */
    private String surname;

    /** The votes. */
    private Integer[] votes;

    // ===========================================
    // Static initialisers
    // ===========================================

    // ===========================================
    // Constructors
    // ===========================================

    /**
     * Instantiates a new candidate.
     */
    public Candidate() {
    }

    /**
     * Instantiates a new candidate.
     *
     * @param firstName the first name
     * @param surname the surname
     * @param votes the votes
     */
    public Candidate(String firstName, String surname, Integer[] votes) {
        this.firstName = firstName;
        this.surname = surname;
        this.votes = votes;
    }

    // ===========================================
    // Public Methods
    // ===========================================

    /**
     * Gets the first name.
     *
     * @return the first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name.
     *
     * @param firstName the new first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the surname.
     *
     * @return the surname
     */
    public String getSurname() {
        return surname;
    }

    /**
     * Sets the surname.
     *
     * @param surname the new surname
     */
    public void setSurname(String surname) {
        this.surname = surname;
    }

    /**
     * Gets the votes.
     *
     * @return the votes
     */
    public Integer[] getVotes() {
        return votes;
    }

    /**
     * Sets the votes.
     *
     * @param votes the new votes
     */
    public void setVotes(Integer[] votes) {
        this.votes = votes;
    }

    // ===========================================
    // Protected Methods
    // ===========================================

    // ===========================================
    // Private Methods
    // ===========================================

}
