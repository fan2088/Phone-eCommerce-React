package edu.gatech.oad.antlab.person;

/**
 *  A simple class for person 2
 *  returns their name and a
 *  modified string 
 *
 * @author Shuge Fan
 * @version 1.1
 */
public class Person2 {
    /** Holds the persons real name */
    private String name;
	 	/**
	 * The constructor, takes in the persons
	 * name
	 * @param pname the person's real name
	 */
	 public Person2(String pname) {
	   name = pname;
	 }
	/**
	 * This method should take the string
	 * input and return its characters in
	 * random order.
	 * given "gtg123b" it should return
	 * something like "g3tb1g2".
	 *
	 * @param input the string to be modified
	 * @return the modified string
	 */
	private String calc(String input) {
	  //Person 2 put your implementation here
        if (input == null) {
		    return null;
	    } else {
			String initial = "";
			boolean b;
			Character[] array = new Character[input.length()];
			for (int i = 0; i < array.length; i++) {
				array[i]= input.charAt(i);
			}
			do {
			b = false;
			for (Character c: array) {
				if (c != null) {
					b = true;
					break;
				}
			}
			int a = (int) (Math.random() * (input.length()));
			if (array[a]!= null) {
				initial += array[a];
				array[a] = null;
			}
			} while (b);
		return initial;
		}
	}
	/**
	 * Return a string rep of this object
	 * that varies with an input string
	 *
	 * @param input the varying string
	 * @return the string representing the 
	 *         object
	 */
	public String toString(String input) {
	  return name + calc(input);
	}
}