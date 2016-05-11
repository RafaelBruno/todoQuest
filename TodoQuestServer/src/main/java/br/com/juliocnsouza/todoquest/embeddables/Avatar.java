package br.com.juliocnsouza.todoquest.embeddables;

import java.io.Serializable;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import org.eclipse.persistence.nosql.annotations.DataFormatType;
import org.eclipse.persistence.nosql.annotations.NoSql;

/**
 *
 * @author julio
 */
@Embeddable
@NoSql( dataFormat = DataFormatType.MAPPED )
public class Avatar implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer lvl;

    private Integer coins;

    private Integer quantMissions;

    private Integer xp;

    private Integer mana;

    private String avatarType;

    private String sex;

    @ElementCollection
    private List<Item> selectedItems;

    public Integer getLvl() {
        return lvl;
    }

    public void setLvl( Integer lvl ) {
        this.lvl = lvl;
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins( Integer coins ) {
        this.coins = coins;
    }

    public Integer getQuantMissions() {
        return quantMissions;
    }

    public void setQuantMissions( Integer quantMissions ) {
        this.quantMissions = quantMissions;
    }

    public Integer getXp() {
        return xp;
    }

    public void setXp( Integer xp ) {
        this.xp = xp;
    }

    public Integer getMana() {
        return mana;
    }

    public void setMana( Integer mana ) {
        this.mana = mana;
    }

    public String getAvatarType() {
        return avatarType;
    }

    public void setAvatarType( String avatarType ) {
        this.avatarType = avatarType;
    }

    public String getSex() {
        return sex;
    }

    public void setSex( String sex ) {
        this.sex = sex;
    }

    public List<Item> getSelectedItems() {
        return selectedItems;
    }

    public void setSelectedItems( List<Item> selectedItems ) {
        this.selectedItems = selectedItems;
    }

}
