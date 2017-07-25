import java.util.*;
public class CDLLIterator implements Iterator
{
    boolean first;
    boolean okToRemove;
    DoubleNode curr;
    CDLL list;
    
    public CDLLIterator(CDLL items)
    {
        first=true;
        okToRemove=false;
        list=items;
        curr=items.getFirstNode();
    }
    public boolean hasNext()
    {
        if (curr==null)
            return false;
        return first || curr!=list.getFirstNode();
    }
    public Object next()
    {
        okToRemove=true;
        Object o = curr.getValue();
        curr = curr.getNext();
        if (first)
            first=false;
        return o;
    }
    
    public void remove()
    {
        if (!okToRemove)
            throw new IllegalStateException("call next");
        okToRemove=false;
        if (curr==list.getFirstNode())
        {
                if (curr.getNext()==curr)
                    curr=null;
                list.removeFirst();
        }
        else
        {
            curr = curr.getPrev();
            list.remove(curr.getNext());
        }
    }
}
