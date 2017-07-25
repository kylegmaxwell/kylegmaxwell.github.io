/**
 * @author Kylu
 * Feb 8, 2004
 * CircularDoublyLinkedList.java
 */
import java.util.NoSuchElementException;

public class CDLL
{
	private DoubleNode sun;
	
	//construct an empty list
	public CDLL()
	{
		sun=null;
	}

	//return true if list is empty, false otherwise
	public boolean isEmpty()
	{return getFirstNode()==null;}
	
	//return number of nodes in the list
	//WARNING: this is order O(n)
	public int size()
	{
		if (isEmpty())
			return 0;
		int size=1;
		DoubleNode p = getFirstNode().getNext();
		while (p!=getFirstNode())
		{
			size++;
			p=p.getNext();
		} 
		return size;
	}

	//needed to traverse list
	public DoubleNode getFirstNode()
	{
		return sun;
	}

	//needed to traverse list
	public DoubleNode getLastNode()
	{
		if (isEmpty())
			return null;
		else
		 	return sun.getPrev();
	 }
	
	
	// insert object o at front of list
	public DoubleNode addFirst(Object o)
	{
		if (isEmpty())
		{
			sun = new DoubleNode(null,o,null);
			sun.setPrev(sun);
			sun.setNext(sun);
			return sun;
		}
		else
		{
			DoubleNode node = new DoubleNode(sun.getPrev(),o,sun);
			node.getNext().setPrev(node);
			node.getPrev().setNext(node);
			sun=node;
			return node;
		} 	
	}

	// insert object o at end of list
	public DoubleNode addLast(Object o)
	{
		addFirst(o);
		sun=sun.getNext();
		return sun.getPrev();
	}
	
	//remove and return first element
	public Object removeFirst()
	{
		if (isEmpty())
			throw new NoSuchElementException("empty");
		Object o = getFirstNode().getValue();
		if (getFirstNode()==getLastNode())//one element
			sun=null;
		else
		{
			DoubleNode newFirst = sun.getNext();
			remove(getFirstNode());
			sun=newFirst;
		}
		return o;
	}

	//remove and return last element
	public Object removeLast()
	{
		if (isEmpty())
			throw new NoSuchElementException("empty");
		Object o = getLastNode().getValue();
		if (getFirstNode()==getLastNode())
			sun=null;
		else
		{
			remove(getLastNode());
		}
		return o;
	}


//	prec: node is in the list
	  //postc: remove the node and return its value 
	  public Object remove(DoubleNode node)
	  {
		  Object o = node.getValue();
		  if (node.getNext()==node)
	  		//System.out.println(this);
		  	sun=null;	 
		if (node==sun)
			sun=sun.getNext();
		node.getPrev().setNext(node.getNext());
		node.getNext().setPrev(node.getPrev());
		return o;
	 }
	 
	//return DoublyLinkedList as String
	public String toString()
	{
		if (isEmpty())
			return "empty.";
		else
		{
			String s = "";
			DoubleNode p = getFirstNode();
			s+=p.getValue()+" ";
			p=p.getNext();
			while (p != getFirstNode())
			{
				s += p.getValue()+" ";
				p = p.getNext();
			}
			return s;
		}
	}
	public java.util.Iterator iterator()
	{ return new CDLLIterator(this); }
}