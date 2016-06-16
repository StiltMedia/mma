class SpecialPolicy < ApplicationPolicy
  def update?
    user.admin? || user.chef?
  end

  def edit?
    update?
  end
end
