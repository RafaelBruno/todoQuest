package br.com.juliocnsouza.todoquest.collections;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
public class Mission implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    @Field( name = "_id" )
    private String id;

    private String userId;

    private String type;

    @Temporal( TemporalType.TIMESTAMP )
    private Date dateTime;

    @OneToMany( fetch = FetchType.EAGER )
    private List<Quest> quests;

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

    public String getType() {
        return type;
    }

    public void setType( String type ) {
        this.type = type;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime( Date dateTime ) {
        this.dateTime = dateTime;
    }

    public List<Quest> getQuests() {
        return quests;
    }

    public void setQuests( List<Quest> quests ) {
        this.quests = quests;
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
        if ( !( object instanceof Mission ) ) {
            return false;
        }
        Mission other = ( Mission ) object;
        if ( ( this.id == null && other.id != null ) || ( this.id != null && !this.id.equals( other.id ) ) ) {
            return false;
        }
        return true;
    }

}
