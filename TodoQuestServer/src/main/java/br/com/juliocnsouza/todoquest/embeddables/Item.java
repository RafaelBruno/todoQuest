package br.com.juliocnsouza.todoquest.embeddables;

import java.io.Serializable;
import javax.persistence.Embeddable;
import org.eclipse.persistence.nosql.annotations.DataFormatType;
import org.eclipse.persistence.nosql.annotations.NoSql;

/**
 *
 * @author julio
 */
@Embeddable
@NoSql( dataFormat = DataFormatType.MAPPED )
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;

    private String desc;

    private String urlImg;

    private Integer price;

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc( String desc ) {
        this.desc = desc;
    }

    public String getUrlImg() {
        return urlImg;
    }

    public void setUrlImg( String urlImg ) {
        this.urlImg = urlImg;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice( Integer price ) {
        this.price = price;
    }

}
