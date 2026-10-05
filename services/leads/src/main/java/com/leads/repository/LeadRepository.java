package com.leads.repository;

import com.leads.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeadRepository extends JpaRepository<Lead, String> {
    Optional<Lead> findByEmail(String email);
}