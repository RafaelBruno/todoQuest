package br.com.juliocnsouza.todoquest.collections;

import br.com.juliocnsouza.todoquest.embeddables.Avatar;
import br.com.juliocnsouza.todoquest.embeddables.Item;
import br.com.juliocnsouza.todoquest.embeddables.Tag;
import java.io.Serializable;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import org.eclipse.persistence.nosql.annotations.DataFormatType;
import org.eclipse.persistence.nosql.annotations.Field;
import org.eclipse.persistence.nosql.annotations.NoSql;

/**
 *
 * @author julio
 */
@Entity
@NoSql( dataFormat = DataFormatType.MAPPED )
public class SystemUser implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Field( name = "_id" )
    private String login;

    private String password;

    private String firstName;

    private String lastName;

    private String nickname;

    private String linkedin;

    private String twitter;

    private String clientIdGoogle;

    @ElementCollection
    private List<Tag> tags;

    @Embedded
    private Avatar avatar;

    @ElementCollection
    private List<Item> items;

    public String getLogin() {
        return login;
    }

    public void setLogin( String login ) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword( String password ) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName( String firstName ) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName( String lastName ) {
        this.lastName = lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname( String nickname ) {
        this.nickname = nickname;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin( String linkedin ) {
        this.linkedin = linkedin;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter( String twitter ) {
        this.twitter = twitter;
    }

    public String getClientIdGoogle() {
        return clientIdGoogle;
    }

    public void setClientIdGoogle( String clientIdGoogle ) {
        this.clientIdGoogle = clientIdGoogle;
    }

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar( Avatar avatar ) {
        this.avatar = avatar;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems( List<Item> items ) {
        this.items = items;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags( List<Tag> tags ) {
        this.tags = tags;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += ( login != null
                  ? login.hashCode()
                  : 0 );
        return hash;
    }

    @Override
    public boolean equals( Object object ) {
        if ( !( object instanceof SystemUser ) ) {
            return false;
        }
        SystemUser other = ( SystemUser ) object;
        if ( ( this.login == null && other.login != null ) || ( this.login != null && !this.login.equals( other.login ) ) ) {
            return false;
        }
        return true;
    }

}
