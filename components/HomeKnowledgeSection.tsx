"use client";

import React, { useState } from "react";
import { BentoKnowledgeHub } from "./BentoKnowledgeHub";
import { ArticleDrawer } from "./ArticleDrawer";
import { KnowledgeArticle } from "@/lib/knowledgeBase";

interface HomeKnowledgeSectionProps {
  locale: string;
}

export const HomeKnowledgeSection: React.FC<HomeKnowledgeSectionProps> = ({ locale }) => {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelectArticle = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <BentoKnowledgeHub
        locale={locale}
        onSelectArticle={handleSelectArticle}
      />
      <ArticleDrawer
        article={selectedArticle}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        locale={locale}
      />
    </>
  );
};
