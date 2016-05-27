package br.com.juliocnsouza.todoquest.embeddables;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import org.eclipse.persistence.nosql.annotations.DataFormatType;
import org.eclipse.persistence.nosql.annotations.NoSql;

/**
 *
 * @author julio
 */
@Embeddable
@NoSql( dataFormat = DataFormatType.MAPPED )
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    private String userId;

    private String title;

    private Integer points;

    private String color;

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

    public Integer getPoints() {
        return points;
    }

    public void setPoints( Integer points ) {
        this.points = points;
    }

    public String getColor() {
        return color;
    }

    public void setColor( String color ) {
        this.color = color;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode( this.userId );
        hash = 67 * hash + Objects.hashCode( this.title );
        return hash;
    }

    @Override
    public boolean equals( Object obj ) {
        if ( this == obj ) {
            return true;
        }
        if ( obj == null ) {
            return false;
        }
        if ( getClass() != obj.getClass() ) {
            return false;
        }
        final Tag other = ( Tag ) obj;
        if ( !Objects.equals( this.userId , other.userId ) ) {
            return false;
        }
        if ( !Objects.equals( this.title , other.title ) ) {
            return false;
        }
        return true;
    }

}
