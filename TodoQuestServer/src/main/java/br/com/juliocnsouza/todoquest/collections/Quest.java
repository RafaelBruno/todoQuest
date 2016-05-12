package br.com.juliocnsouza.todoquest.collections;

import br.com.juliocnsouza.todoquest.embeddables.Tag;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.eclipse.persistence.nosql.annotations.DataFormatType;
import org.eclipse.persistence.nosql.annotations.Field;
import org.eclipse.persistence.nosql.annotations.NoSql;

/**
 *
 * @author julio
 */
@Entity
@NoSql( dataFormat = DataFormatType.MAPPED )
@NamedQueries( {
    @NamedQuery( name = Quest.FIND_ALL_BY_USER ,
                 query = "SELECT q FROM Quest q WHERE q.userId = :userId ORDER BY q.dateTime DESC" )
} )
public class Quest implements Serializable {

    public static final String FIND_ALL_BY_USER = "Quest.FIND_ALL_BY_USER";
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    @Field( name = "_id" )
    private String id;

    private String userId;

    private String title;

    private String description;

    @ElementCollection
    private List<Tag> tags;

    @Temporal( TemporalType.TIMESTAMP )
    private Date dateTime;

    private Integer dificult;

    private Boolean completed;

    private Integer droppedCoins;

    public String getId() {
        return id;
    }

    public void setId( String id ) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId( String userId ) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle( String title ) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription( String description ) {
        this.description = description;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags( List<Tag> tags ) {
        this.tags = tags;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime( Date dateTime ) {
        this.dateTime = dateTime;
    }

    public Integer getDificult() {
        return dificult;
    }

    public void setDificult( Integer dificult ) {
        this.dificult = dificult;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted( Boolean completed ) {
        this.completed = completed;
    }

    public Integer getDroppedCoins() {
        return droppedCoins;
    }

    public void setDroppedCoins( Integer droppedCoins ) {
        this.droppedCoins = droppedCoins;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += ( id != null
                  ? id.hashCode()
                  : 0 );
        return hash;
    }

    @Override
    public boolean equals( Object object ) {
        if ( !( object instanceof Quest ) ) {
            return false;
        }
        Quest other = ( Quest ) object;
        if ( ( this.id == null && other.id != null ) || ( this.id != null && !this.id.equals( other.id ) ) ) {
            return false;
        }
        return true;
    }

}
