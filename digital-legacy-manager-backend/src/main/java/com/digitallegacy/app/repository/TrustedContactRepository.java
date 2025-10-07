package com.digitallegacy.app.repository;

import com.digitallegacy.app.model.TrustedContact;
import com.digitallegacy.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrustedContactRepository extends JpaRepository<TrustedContact, Long> {
    List<TrustedContact> findByOwner(User owner);
}
