/**
 * @author Kylu
 * Feb 8, 2004
 * DoubleNode.java
 */

public class DoubleNode
{
    /*Doubly linked list node */

    private Object value;
    private DoubleNode next;
    private DoubleNode prev;

    public DoubleNode(DoubleNode initPrev,
                            Object initValue, DoubleNode initNext)
    {
    prev = initPrev;
    value = initValue;
    next = initNext;
    }

     public DoubleNode getPrev()
     {return prev;}
  
     public void setPrev(DoubleNode theNewPrev)
     {prev = theNewPrev;}

     public Object getValue()
     {return value;}

     public void setValue(Object theNewValue) 
     {value = theNewValue;}

     public DoubleNode getNext()
     {return next;}
       
     public void setNext(DoubleNode theNewNext)
     {next = theNewNext;}
     
     public String toString()
     { return getValue().toString(); }
}